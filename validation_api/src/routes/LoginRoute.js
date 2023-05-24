const express = require('express');
const LoginController = require('../controller/LoginController');

const router = express.Router();

router.get('/', LoginController.getLoginInfo);

router.post('/info', LoginController.createLoginInfo);

module.exports = router;
