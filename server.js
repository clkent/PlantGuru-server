'use strict';
//Server Initializers
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');
const { dbConnect } = require('./db');
const jwtAuth = require('./strategies/jwt');
//Routers
const customersRouter = require('./routes/customers');
const gurusRouter = require('./routes/gurus');
const loginRouter = require('./routes/auth');
const plantsRouter = require('./routes/plants');

//Config Vars
const { DB_URI, PORT, CLIENT_ORIGIN } = require('./config');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/plants', jwtAuth);

//Routers middleware
app.use('/api/customers', customersRouter);
app.use('/api/gurus', gurusRouter);
app.use('/auth', loginRouter);
app.use('/api/plants', plantsRouter);

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
