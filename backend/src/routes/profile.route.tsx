const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');


router.get('/profile/:id', profileController.getProfile);
router.put('/update-profile/:id', profileController.updateProfile);

module.exports = router;