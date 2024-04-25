const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware, isAdmin } = require('../middlewares/middlewares');

router.post('/create-user', authMiddleware, isAdmin, adminController.createUser);
router.post('/approve-request', authMiddleware, isAdmin, adminController.approveRequest);
router.post('/reject-request', authMiddleware, isAdmin, adminController.rejectRequest);
module.exports = router;