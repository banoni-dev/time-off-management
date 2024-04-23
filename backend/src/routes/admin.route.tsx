const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');


router.get('/', adminController.login);
router.post('/create', adminController.create);

module.exports = router;