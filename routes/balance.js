const express = require('express');
const router = express.Router();
const controller = require('../controllers/account');

// Get balance
router.get('/', controller.ballance);

module.exports = router;