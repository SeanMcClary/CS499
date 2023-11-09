import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

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

export default router;
