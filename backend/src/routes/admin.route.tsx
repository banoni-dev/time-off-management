const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware, isAdmin } = require('../middlewares/middlewares');

router.post('/create', authMiddleware, isAdmin, adminController.create);

module.exports = router;