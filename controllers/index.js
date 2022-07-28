const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home')
const dashboardRoutes = require('./dashboard')
const chatRoutes = require("./chat");

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
