import express from 'express';
import R from 'r-integration';

var router = express.Router();

router.get('/', function(req, res, next) {
  const model = R.callMethod('./express/r_scripts/model.R', 'getRounds', { x: 0 });
  const result = {};
  result[model[1]] = model[3];
  result[model[2]] = model[4];
  res.json(result);
});

export default router;
