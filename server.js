'use strict';
//Server Initializers
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');
const { dbConnect } = require('./db');

//Config Vars
const { DB_URI } = require('./config');
const { PORT } = require('./config');

//Routers
const customersRouter = require('./routes/customers');
const loginRouter = require('./routes/auth');

const client = new pg.Client(DB_URI);

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routers middleware
app.use('/api/customers', customersRouter);
app.use('/auth', loginRouter);

app.get('/', (req, res, next) => {
  console.log('Here, line 16');
});

//Custom Error Handlers

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Server Start
(function runServer() {
  app
    .listen(PORT, () => {
      dbConnect();
      console.log(`listening on port ${PORT}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
})();
