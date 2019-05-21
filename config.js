/* eslint-disable linebreak-style */
/* eslint-disable radix */

const env = process.env.NODE_ENV;

const dev = {
  port: parseInt(process.env.DEV_APP_PORT) || 3000,
};

const test = {
  port: parseInt(process.env.TEST_APP_PORT) || 8000,
};

const config = {
  dev,
  test,
};

export default config;
