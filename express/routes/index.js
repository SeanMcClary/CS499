import express from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ message: 'Hello world!' });
});

export default router;
