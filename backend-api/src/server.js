const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const { logger, logMiddleware } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

// Health check
app.get('/health', (req, res) => {
    logger.info('Health check request');
    res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error', { error: err.message });
    res.status(500).json({ 
        error: 'Internal server error', 
        details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
