const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');
const withAuth = require('../utils/auth');

// RENDER DASHBOARD
router.get('/', withAuth, async (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;