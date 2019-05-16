import express from'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ msg: 'Welcome to quick credit' });
});

export default router;
