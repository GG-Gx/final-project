require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for handling CORS
app.use(cors({ origin: ['*'],
methods: ['*'],
}));

// Body parser middleware
app.use(bodyParser.json());

console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Import and use the calendar routes
const calendarRoutes = require('./routes/routes');
const userRoutes = require('./routes/user');
const publicRouter = require('./routes/publicRouter');


app.use('/public', publicRouter);
app.use('/user', userRoutes);
app.use('/calendar', calendarRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
