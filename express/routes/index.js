import express from 'express';
import R from 'r-integration';

var router = express.Router();

router.get('/', function(req, res, next) {
  const message = R.callMethod('./express/r_scripts/model.R', 'getRounds', { x: 0 });
  res.json({ message });
});

export default router;
