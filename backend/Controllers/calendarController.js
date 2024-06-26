const Event = require('../Models/eventModel');
const moment = require('moment');



exports.createAvailability = async (req, res) => {
  console.log('Received POST request to /calendar/create-availability');
  try {
    const user_id = req.user._id;
    const { title, start, end } = req.body;

    // Check if all required fields are present
    if (!title || !start || !end) {
      return res.status(400).send('Missing required fields');
    }

    const event = new Event({
      title,
      start,
      end,
      user_id
    });

    await event.save();
    console.log('Event saved:', event);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAvailability = async (req, res) => {
  try {
    // Parse the date query parameters
    const start = moment(req.query.start).toDate();
    const end = moment(req.query.end).toDate();
    const user_id = req.user._id;

    console.log('Fetching availability...');
    console.log('Start date:', start);
    console.log('End date:', end);

    const events = await Event.find({ start: { $gte: start }, end: { $lte: end }, user_id });

    console.log('Availability data:', events);

    res.send(events);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAvailabilityByuserId = async (req, res) => {
  try {
    const user_id = req.params.id;

    if (!user_id) {
      console.log('User ID is missing in the request.');
      return res.status(400).send('User ID is missing in the request.');
    }

    console.log('User ID:', user_id); // Log the user ID received in the request

    const events = await Event.find({ user_id });

    console.log('Availability data:', events); // Log the events fetched

    if (events.length === 0) {
      console.log('No events found for user:', user_id);
      return res.status(404).send('No events found for this user.');
    }

    res.send(events);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).send('Internal Server Error');
  }
};





exports.deleteAvailability = async (req, res) => {
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
};
