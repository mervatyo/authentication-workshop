const express = require('express');
const router = express.Router();

const home = require('./home');
const auth = require('./auth');
const error = require('./error');

// add home route
router.get('/', home.get);
router.get('/login', auth.loginPage);
router.get('/register', auth.registerPage);
router.post('/authenticate', auth.authenticate);
router.post('/addUser', auth.addUser);
router.get('/logout', auth.logout);
router.use(error.client);
router.use(error.server);

module.exports = router;