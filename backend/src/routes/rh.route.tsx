const express = require('express');
const router = express.Router();
const rhController = require('../controllers/rh.controller');


router.get('/employees', rhController.getEmployees);
router.get('/employee/:id', rhController.getEmployee);
router.get('/all-requests', rhController.getAllRequests);
router.get('/all-requests/:id', rhController.getAllRequestsForEmployee);
router.get('/approved-requests', rhController.getApprovedRequests);
router.get('/approved-requests/:id', rhController.getApprovedRequestsForEmployee);
router.put('/update-credits/:id', rhController.updateCredits);

module.exports = router;