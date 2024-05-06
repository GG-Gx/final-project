const express = require('express');
const router = express.Router();
const calendarController = require('../Controllers/calendarController.js'); // Corrected file name with '.js' extension

router.post('/create-availability', calendarController.createAvailability);
router.get('/get-availability', calendarController.getAvailability);
router.delete('/delete-availability/:id', calendarController.deleteAvailability);

module.exports = router;
