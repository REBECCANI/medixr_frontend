const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser"); 
const db = require("./db");
const bcrypt = require('bcrypt');
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

app.post("/register", (req, res) => {
    const { firstName, lastName, email, password, institution, verificationToken } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10); 

    const query = `
        INSERT INTO users_medixr (firstName, lastName, email, password, institution, verificationToken, verified, expires)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [firstName, lastName, email, hashedPassword, institution, verificationToken, false, Date.now() + 3600000]; 

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting user into the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'User registered successfully', verificationLink: `http://localhost:3000/verify/${verificationToken}` });
    });
});

app.post("/login", (req, res) => {
    console.log('Login route hit');
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users_medixr WHERE email = ? AND verified = ?';

    db.query(query, [email, true], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log('Query results:', results);

        if (results.length === 0) {
            console.log('No user found or not verified');
            return res.status(400).json({ error: 'Invalid email or the account is not verified' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
            if (bcryptErr) {
                console.error('Error comparing passwords:', bcryptErr);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!isMatch) {
                console.log('Invalid password');
                return res.status(400).json({ error: 'Invalid password' });
            }

            console.log('Login successful');
            res.json({ message: 'Login successful' });
        });
    });
});

app.post("/resetpassword", (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Email and new password are required' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const resetVerificationToken = uuidv4();

    const findUserQuery = `
        SELECT * FROM users_medixr WHERE email = ?
    `;

    db.query(findUserQuery, [email], (findErr, results) => {
        if (findErr) {
            console.error('Error querying the database:', findErr);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'No user found with this email' });
        }

        const updateQuery = `
            UPDATE users_medixr SET password = ?, resetVerificationToken = ? WHERE email = ?
        `;

        db.query(updateQuery, [hashedPassword, resetVerificationToken, email], (updateErr, result) => {
            if (updateErr) {
                console.error('Error updating user password:', updateErr);
                return res.status(500).json({ error: 'Database error' });
            }

            // Send verification email with reset token
            const verificationLink = `http://localhost:3000/verify/${resetVerificationToken}`;
            const templateParams = {
                from_name: 'Medi XR',
                to_email: email,
                link: verificationLink,
            };

            emailjs.send('service_h9j63h5', 'template_83247f8', templateParams, '9fnX19H-Z6IBp4IYD')
                .then(() => {
                    console.log('Email sent with template params:', templateParams);
                    res.json({ message: 'Password reset successful. Check your email to verify' });
                })
                .catch((emailErr) => {
                    console.error('Error sending email:', emailErr);
                    res.status(500).json({ error: 'Error sending verification email' });
                });
        });
    });
});

app.get("/verifyreset/:token", (req, res) => {
    const { token } = req.params;

    const query = `
        SELECT * FROM users_medixr WHERE (verificationToken = ? OR resetVerificationToken = ?) AND expires > ?
    `;

    db.query(query, [token, token, Date.now()], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Token is invalid or expired' });
        }

        const user = results[0];

        let updateQuery;
        if (user.verificationToken === token) {
            updateQuery = `
                UPDATE users_medixr SET verified = ? WHERE verificationToken = ?
            `;
        } else if (user.resetVerificationToken === token) {
            updateQuery = `
                UPDATE users_medixr SET resetVerificationToken = NULL WHERE resetVerificationToken = ?
            `;
        }

        db.query(updateQuery, [true, token], (updateErr) => {
            if (updateErr) {
                console.error('Error updating the user verification status:', updateErr);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ message: 'Verification successful!' });
        });
    });
});

app.get("/verify/:token", (req, res) => {
    const { token } = req.params;

    const query = `
        SELECT * FROM users_medixr WHERE verificationToken = ? AND expires > ?
    `;

    db.query(query, [token, Date.now()], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Token is invalid or expired' });
        }

        const user = results[0];

        const updateQuery = `
            UPDATE users_medixr SET verified = ? WHERE verificationToken = ?
        `;

        db.query(updateQuery, [true, token], (updateErr) => {
            if (updateErr) {
                console.error('Error updating the user verification status:', updateErr);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ message: 'Email verified successfully!' });
        });
    });
});

app.get("/dashboard",  (req, res) => {
    res.json({ message: 'Welcome to the dashboard', user: req.user });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});  

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
