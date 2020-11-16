const Winston = require("winston");
require("winston-mongodb");
require("dotenv").config(); // to use dotenv file
const keys = require("../config/keys");

const winston = Winston.createLogger({
  levels: Winston.config.syslog.levels,
  transports: [
    new Winston.transports.MongoDB(
      {
        db: keys.mongoUri,
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ),
  ],
});

module.exports = winston;
