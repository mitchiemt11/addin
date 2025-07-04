const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const { logger } = require('../middleware/logger');
const { validateEmail } = require('../utils/validators');

// Protected route for contact enrichment
router.get('/enrich/:email', auth, (req, res) => {
    try {
        const { email } = req.params;

        // Validate email format
        if (!validateEmail(email)) {
            logger.error('Invalid email format', { email });
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Log the request
        logger.info('Contact enrichment request', { email });

        const stmt = db.prepare(`SELECT * FROM contacts WHERE email = ?`);
        const contact = stmt.get(email);

        if (!contact) {
            logger.warn('Contact not found', { email });
            return res.status(404).json({ error: 'Contact not found' });
        }

        logger.info('Contact found', { email });
        res.json({
            email: contact.email,
            fullName: contact.full_name,
            department: contact.department,
            phoneNumber: contact.phone_number,
            jobTitle: contact.job_title
        });
    } catch (error) {
        logger.error('Error in contact enrichment', { error: error.message });
        res.status(500).json({ 
            error: 'Internal server error', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
});

module.exports = router;
