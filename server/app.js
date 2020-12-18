// "mongodb://localhost/newVidly_tests"
// mongodb://localhost/newVidly_tests
// mongodb+srv://zohaib:1234@cluster0-vvrwq.mongodb.net/events?retryWrites=true&w=majority

//! // we must run a redis server to work with it

const express = require('express');
const app = express();

// Startup Routes
require('./startup/logger')(); // logs
require('./startup/database-connection')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/production')(app);
require('dotenv').config(); //? to use dotenv file

const logger = require('./log/logger');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan Enabled');
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.info(`App is running on port ${port}`);
});
