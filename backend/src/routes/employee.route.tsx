const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');


router.post('/request', employeeController.createRequest);
router.get('/requests/:id', employeeController.getRequests);
router.get('/approved-requests/:id', employeeController.getApprovedRequests);

module.exports = router;