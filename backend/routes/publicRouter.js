const express = require('express');
const router = express.Router();
const calendarController = require('../Controllers/calendarController.js');
const emailController = require('../Controllers/emailController.js');

// controller functions
router.get('/get-availability/:id', calendarController.getAvailabilityByuserId);
router.post('/send-email', emailController.sendEmail);


module.exports = router;
