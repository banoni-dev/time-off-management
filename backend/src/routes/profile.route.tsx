const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');


router.get('/profile/:id', profileController.getProfile);
router.put('/update-profile', profileController.updateProfile);

module.exports = router;