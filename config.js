/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable radix */
// import dotenv from 'dotenv';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.ENV;

const dev = {
  port: parseInt(process.env.PORT) || 3000,
  database_url: process.env.DATABASE_URL,
  secrete: process.env.SECRETE
};

const test = {
  port: parseInt(process.env.TEST_PORT) || 5000,
  database_url: process.env.TEST_DATABASE_URL,
  secrete: process.env.SECRETE
};

const config = {
  dev,
  test,
};

export default config[env];
