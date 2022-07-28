const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/', (req,res) => {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    })
})

// RENDER LOGIN PAGE
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.render('chatBody', {
        layout: 'chat',
        loggedIn: req.session.loggedIn
    });
      return;
    }

    res.render('login', {
      loggedIn: req.session.loggedIn
    });
  });

  module.exports = router;