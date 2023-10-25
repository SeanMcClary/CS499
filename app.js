import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';

import indexRouter from '#express/routes/index';

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

export default app;
