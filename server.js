'use strict';
//Server Initializers
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');
//Config Vars
const { DB_URI } = require('./config');
const { PORT } = require('./config');

const client = new pg.Client(DB_URI);

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routers

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
      console.info(`App listening on port ${PORT}`);
      client.connect(function(err) {
        if (err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('SELECT NOW() AS "theTime"', function(err, result) {
          if (err) {
            return console.error('error running query', err);
          }
          console.info(result.rows[0].theTime, 'POSTGRES CONNECTED');
          //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        });
      });
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
})();
