const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.DB_URL_DEV)

module.exports = {
  port: process.env.PORT || 3000,
  dbURL: process.env.DB_URL_DEV
  // dbURL:
  //   process.env.NODE_ENV === "production"
  //     ? process.env.DB_URL_PROD
  //     : process.env.NODE_ENV === "test"
  //     ? process.env.DB_URL_TEST
  //     : process.env.DB_URL_DEV,
};
