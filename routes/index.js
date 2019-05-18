/* eslint-disable linebreak-style */
import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ msg: 'Welcome to quick credit' });
});

export default router;
