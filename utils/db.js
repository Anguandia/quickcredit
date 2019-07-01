/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
import { Pool } from 'pg';
import config from '../config';

export const pool = new Pool({ connectionString: config.database_url });

pool.on('connect', () => {
  console.log('connected to the Database');
});

export const createTables = () => {
  const tables = `CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL UNIQUE NOT NULL,
          firstname VARCHAR(128) NOT NULL,
          lastname VARCHAR(128) NOT NULL,
          email VARCHAR(128) UNIQUE NOT NULL,
          hash VARCHAR NOT NULL,
          salt VARCHAR(128) NOT NULL,
          status VARCHAR(128) NOT NULL,
          tel VARCHAR(128) NOT NULL,
          token VARCHAR NOT NULL,
          address JSONB,
          isadmin BOOLEAN NOT NULL,
          picture VARCHAR,
          PRIMARY KEY (id, email)
        ); CREATE TABLE IF NOT EXISTS
        loans(
          id SERIAL PRIMARY KEY,
          client VARCHAR(128) NOT NULL,
          amount FLOAT NOT NULL,
          tenor INT NOT NULL,
          interest FLOAT NOT NULL,
          balance FLOAT NOT NULL,
          paymentinstallment FLOAT NOT NULL,
          createdon VARCHAR NOT NULL,
          status VARCHAR NOT NULL,
          repaid BOOLEAN NOT NULL
        ); CREATE TABLE IF NOT EXISTS
        repayments(
          id SERIAL PRIMARY KEY,
          loanid INTEGER REFERENCES loans(id),
          createdon VARCHAR NOT NULL,
          amount FLOAT NOT NULL,
          monthlyinstallment FLOAT NOT NULL,
          paidamount FLOAT,
          balance FLOAT
        );`;
  pool.query(tables)
    .then((res) => {
      console.log('users', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

require('make-runnable');