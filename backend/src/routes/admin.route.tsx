const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware, isAdmin } = require('../middlewares/middlewares');

router.get('/hrs', adminController.getHRs);
router.post('/create-user', adminController.createUser);
router.delete('/delete-user/:id', adminController.deleteUser);
router.put('/approve-request/:id', adminController.approveRequest);
router.put('/reject-request/:id', adminController.rejectRequest);
module.exports = router;