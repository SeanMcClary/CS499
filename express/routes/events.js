import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

import getEvents from '#express/queries/getEvents';

const router = express.Router();
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.MYSQL_DB_PORT,
});

router.get('/', (req, res, next) => getEvents(conn, req, res));

export default router;
