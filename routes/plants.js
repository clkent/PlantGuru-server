const express = require('express');
const router = express.Router();
const { DB_URI } = require('../config');
const config = require('../knexfile.js');
const env = 'development';
const knex = require('../knex');
const Plants = require('../models/plant');
const {
  requiredFieldsInBody,
  idValidator
} = require('../utilities/validators');

router.get('/', (req, res, next) => {});

router.get('/:id', idValidator, (req, res, next) => {
  let id = req.user.id;
  Plants.query()
    .where('customer_id', id)
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      next(err);
    });
});

router.post(
  '/',
  idValidator,
  requiredFieldsInBody([
    'name',
    'age',
    'type',
    'sunlight',
    'mood',
    'wws',
    'zoo'
  ]),
  (req, res, next) => {
    let { name, age, type, sunlight, mood, wws } = req.body;
    let created_at = new Date().toUTCString();
    let updated_at = new Date().toUTCString();
    console.log(req.user);
    let id = req.user.id;

    Plants.query()
      .insert({
        name,
        age,
        type,
        sunlight,
        mood,
        'weekly-watering-schedule': JSON.stringify(wws),
        created_at,
        updated_at,
        customer_id: id
      })
      .then(res => res.json(res))
      .catch(err => next(err));
  }
);

module.exports = router;
