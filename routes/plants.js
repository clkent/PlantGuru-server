const express = require('express');
const router = express.Router();
const { DB_URI } = require('../config');
const config = require('../knexfile.js');
const env = 'development';
const knex = require('../knex');
const Plants = require('../models/plant');

router.post('/', async (req, res, next) => {
  try {
    let test = await Plants.query().insert({
      name: 'Conifer Livingroom',
      age: '2 months',
      type: 'Conifer',
      sunlight: 'direct sunlight',
      mood: 'happy',
      'weekly-watering-schedule': JSON.stringify({
        Monday: true,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      }),
      created_at: `${new Date().toUTCString()}`,
      updated_at: `${new Date().toUTCString()}`,
      customer_id: 7
    });
    console.log(test);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
