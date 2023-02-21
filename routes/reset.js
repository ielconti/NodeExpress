const express = require('express');
const router = express.Router();
const controller = require('../controllers/account');

router.post('/', controller.reset);

module.exports = router;