const express = require('express');
const router = express.Router();
const controller = require('../controllers/account');

// Create account with initial balance
router.post('/', controller.event);

module.exports = router;