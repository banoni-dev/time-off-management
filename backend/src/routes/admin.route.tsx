const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware, isAdmin } = require('../middlewares/middlewares');

router.get('/hrs', adminController.getHRs);
router.post('/create-user', adminController.createUser);
router.delete('/delete-user/:id', adminController.deleteUser);
router.post('/approve-request', adminController.approveRequest);
router.post('/reject-request', adminController.rejectRequest);
module.exports = router;