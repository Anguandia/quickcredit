/* eslint-disable linebreak-style */
import express from 'express';
import { createTables } from './utils/db';

const router = express.Router();

/* GET home page. */
router.get('/', createTables, (req, res) => {
  res.json({ msg: 'Welcome to quick credit' });
});

export default router;
