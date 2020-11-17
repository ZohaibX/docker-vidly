const mongoose = require("mongoose");
const logger = require("../log/logger");
require("dotenv").config(); // to use dotenv file
const keys = require("../config/keys");

module.exports = async function () {
  try {
    await mongoose.connect(
      "mongodb+srv://zohaib:1234@cluster0-vvrwq.mongodb.net/events?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    logger.info("connected to local database");
  } catch (error) {
    logger.error("error in database connection: ", error);
  }
};
