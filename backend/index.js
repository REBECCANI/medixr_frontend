const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
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
    try {
        console.log('Reset password request received:', req.body);
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            console.log('Missing email or password');
            return res.status(400).json({ error: 'Email and new password are required' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const resetVerificationToken = uuidv4();
        const expirationTime = Date.now() + 3600000; // 1 hour from now

        console.log('Searching for user with email:', email);
        const findUserQuery = `
            SELECT * FROM users_medixr WHERE email = ?
        `;

        db.query(findUserQuery, [email], (findErr, results) => {
            if (findErr) {
                console.error('Error querying the database:', findErr);
                return res.status(500).json({ error: 'Database error: ' + findErr.message });
            }

            if (results.length === 0) {
                console.log('No user found with email:', email);
                return res.status(400).json({ error: 'No user found with this email' });
            }

            console.log('User found, updating password');
            const updateQuery = `
                UPDATE users_medixr 
                SET password = ?, resetVerificationToken = ?, expires = ? 
                WHERE email = ?
            `;

            db.query(updateQuery, [hashedPassword, resetVerificationToken, expirationTime, email], (updateErr, result) => {
                if (updateErr) {
                    console.error('Error updating user password:', updateErr);
                    return res.status(500).json({ error: 'Database error: ' + updateErr.message });
                }

                console.log('Password reset initiated successfully');
                res.json({ 
                    message: 'Password reset initiated. Check your email to verify', 
                    resetVerificationToken,
                    verificationLink: `http://localhost:3000/verifyreset/${resetVerificationToken}`
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error in resetpassword route:', error);
        res.status(500).json({ error: 'Unexpected error: ' + error.message });
    }
});


app.get("/verifyreset/:token", (req, res) => {
    const { token } = req.params;

    console.log('Verifying reset token:', token);

    const query = `
        SELECT * FROM users_medixr 
        WHERE resetVerificationToken = ? AND expires > ?
    `;

    const currentTime = Date.now();

    db.query(query, [token, currentTime], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }

        console.log('Query results:', results);

        if (results.length === 0) {
            console.log('No valid reset token found:', token);
            return res.status(400).json({ error: 'Token is invalid or expired' });
        }

        const user = results[0];
        console.log('User found:', user.email);

        const updateQuery = `
            UPDATE users_medixr 
            SET resetVerificationToken = NULL, expires = NULL 
            WHERE resetVerificationToken = ?
        `;

        db.query(updateQuery, [token], (updateErr) => {
            if (updateErr) {
                console.error('Error updating the user reset verification status:', updateErr);
                return res.status(500).json({ error: 'Database error: ' + updateErr.message });
            }

            console.log('Password reset verification successful for user:', user.email);
            res.json({ message: 'Password reset verification successful!' });
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
