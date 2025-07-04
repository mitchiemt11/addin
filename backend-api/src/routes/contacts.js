const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Protected route for contact enrichment
router.get('/enrich/:email', auth, (req, res) => {
    try {
        const { email } = req.params;
        const stmt = db.prepare(`SELECT * FROM contacts WHERE email = ?`);
        const contact = stmt.get(email);

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json({
            email: contact.email,
            fullName: contact.full_name,
            department: contact.department,
            phoneNumber: contact.phone_number,
            jobTitle: contact.job_title
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
