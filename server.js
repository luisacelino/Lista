const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Function to generate a random alphanumeric string
const generateRandomLink = () => {
    return Math.random().toString(36).substr(2, 6); // Generates a 6-character alphanumeric string
};


// Endpoint to generate and return a random donation link
app.get('/generate-link', (req, res) => {
    const randomLink = generateRandomLink();
    const donationLink = `https://luisa.com/${randomLink}`;
    res.json({ link: donationLink });
});

// Serve static files (index.html, style.css, script.js, etc.)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
