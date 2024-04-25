const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');


router.post('/request', employeeController.createRequest);
router.get('/requests', employeeController.getRequests);
router.get('/approved-requests', employeeController.getApprovedRequests);

module.exports = router;