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
    const { firstName, lastName, email, password, institution, category, verificationToken } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10); 

    const query = `
        INSERT INTO users_medixr (firstName, lastName, email, password, institution, category, verificationToken, verified, expires)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [firstName, lastName, email, hashedPassword, institution, category, verificationToken, false, Date.now() + 3600000]; 

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

        console.log('Updating password for user with email:', email);
        const updateQuery = `
            UPDATE users_medixr 
            SET password = ?
            WHERE email = ?
        `;

        db.query(updateQuery, [hashedPassword, email], (updateErr, result) => {
            if (updateErr) {
                console.error('Error updating user password:', updateErr);
                return res.status(500).json({ error: 'Database error: ' + updateErr.message });
            }

            console.log('Password updated successfully');
            res.json({ message: 'Password updated successfully' });
        });
    } catch (error) {
        console.error('Unexpected error in resetpassword route:', error);
        res.status(500).json({ error: 'Unexpected error: ' + error.message });
    }
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

app.get("/dashboard", (req, res) => {
    res.json({ message: 'Welcome to the dashboard!' });
});

app.get("/api/category-stats", (req, res) => {
    const query = `
        SELECT category, COUNT(*) as count
        FROM users_medixr
        WHERE verified = true
        GROUP BY category
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching category stats:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const stats = results.reduce((acc, row) => {
            acc[row.category] = row.count;
            return acc;
        }, {});

        res.json(stats);
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});  

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
