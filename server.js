'use strict';
//Server Initializers
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnect, dbGet } = require('./db');
//Config Vars
const { DB_URI, PORT, CLIENT_ORIGIN } = require('./config');
//Routers
const plantsRouter = require('./routes/plants');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes Middleware
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
