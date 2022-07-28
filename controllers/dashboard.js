const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');
const withAuth = require('../utils/auth');

// RENDER DASHBOARD
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
          });

        const users = userData.map((user) =>
            user.get({ plain: true })
        );

        res.render('dashboard', {
            users,
            loggedIn: req.session.loggedIn
        });
    } catch {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;