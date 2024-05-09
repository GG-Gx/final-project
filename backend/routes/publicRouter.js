const express = require('express');
const router = express.Router();
const calendarController = require('../Controllers/calendarController.js');

// controller functions
router.get('/get-availability/:id', calendarController.getAvailabilityByuserId);


module.exports = router;
