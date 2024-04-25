const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');


router.post('/login', adminController.login);
router.post('/logout', adminController.logout);
router.post('/create', adminController.create);

module.exports = router;