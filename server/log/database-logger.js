const Winston = require('winston');
require('winston-mongodb');
require('dotenv').config(); // to use dotenv file
const keys = require('../config/keys');

const winston = Winston.createLogger({
  levels: Winston.config.syslog.levels,
  transports: [
    new Winston.transports.MongoDB(
      {
        db:
          'mongodb+srv://zohaib:1234@cluster0-vvrwq.mongodb.net/events?retryWrites=true&w=majority',
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
  ],
});

module.exports = winston;
