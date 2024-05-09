const express = require('express');
const router = express.Router();
const calendarController = require('../Controllers/calendarController.js');




const requireAuth = require('../middleware/requireAuth'); 


// Use the middleware for all routes
router.use(requireAuth);

// Calendar routes

router.post('/create-availability', calendarController.createAvailability);
router.get('/get-availability', calendarController.getAvailability);
router.delete('/delete-availability/:id', calendarController.deleteAvailability);


module.exports = router;
