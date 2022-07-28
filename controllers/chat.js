const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');
const withAuth = require('../utils/auth');

// RENDER CHAT
router.get('/', withAuth, async (req, res) => {
    res.render('chatBody', {
        layout: 'chat',
        loggedIn: req.session.loggedIn
    });
    return;
});

module.exports = router;