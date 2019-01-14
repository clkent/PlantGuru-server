//Server Initializers
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//Config Vars
const { PORT } = require('./config');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('Here, line 16');
});

//Error Handlers

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

//Server Starter
app
  .listen(PORT, () => {
    console.info(`App listening on port ${PORT}`);
  })
  .on('error', err => {
    console.error('Express failed to start');
    console.error(err);
  });
