import express from 'express';
import R from 'r-integration';
import mysql from 'mysql2';
import dotenv from 'dotenv';

import getEventResults from '#express/queries/getEventResults';
import getPlayer from '#express/queries/getPlayer';

const router = express.Router();
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.MYSQL_DB_PORT,
});

router.get('/', function(req, res, next) {
  conn.connect((e) => {
    conn.query('select * from players', (e, result) => {
      res.json(result);
    });
  });
});

router.get('/:pdga_no', (req, res, next) => getPlayer(conn, req, res));

router.get('/:pdga_no/model', (req, res, next) => {
  if (req.query.event_id) {
    getEventResults(conn, req, (result) => {
      if (result.length > 2) {
        const model = R.callMethod('./express/r_scripts/player_model.R', 'getPredictedEventScore', { x: parseInt(req.params.pdga_no), y: parseInt(req.query.event_id) });
        const result = {};
        result[model[1]] = model[3];
        result[model[2]] = model[4];
        res.json(result);
      } else {
        const model = R.callMethod('./express/r_scripts/event_model.R', 'getPredictedScore', { x: parseInt(req.query.event_id) });
        const result = {};
        result[model[1]] = model[3];
        result[model[2]] = model[4];
        res.json(result);
      }
    });
  } else {
    const model = R.callMethod('./express/r_scripts/player_model.R', 'getPredictedScore', { x: parseInt(req.params.pdga_no) });
    const result = {};
    result[model[1]] = model[3];
    result[model[2]] = model[4];
    res.json(result);
  }
});

export default router;
