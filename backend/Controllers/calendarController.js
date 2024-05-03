const router = require('express').Router();
const Event = require('../Models/eventModel');
const moment = require('moment');


router.post('/create-availability', async (req, res) => {
  console.log('Received POST request to /calendar/create-availability');
  try {
    const { title, start, end } = req.body;

    // Check if all required fields are present
    if (!title || !start || !end) {
      return res.status(400).send('Missing required fields');
    }

    const event = new Event({
      title,
      start,
      end
    });

    await event.save();
    console.log('Event saved:', event);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/get-availability', async (req, res) => {
  try {
    // Parse the date query parameters
    const start = moment(req.query.start).toDate();
    const end = moment(req.query.end).toDate();

    console.log('Fetching availability...');
    console.log('Start date:', start);
    console.log('End date:', end);

    const events = await Event.find({ start: { $gte: start }, end: { $lte: end } });

    console.log('Availability data:', events);

    res.send(events);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/delete-availability/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    // Use Mongoose to find and delete the event
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      // If event with the given ID is not found, return 404 Not Found
      return res.status(404).send('Event not found');
    }

    // Respond with success
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting event:', error);
    // If there's an error, return 500 Internal Server Error
    res.status(500).send('Internal Server Error');
  }
});





module.exports = router;