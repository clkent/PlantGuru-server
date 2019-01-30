const express = require('express');
const router = express.Router();
const { DB_URI } = require('../config');
const config = require('../knexfile.js');
const env = 'development';
const knex = require('../knex');
const CustomerPlant = require('../models/customer_plant');
const {
  requiredFieldsInBody,
  idValidator
} = require('../utilities/validators');

router.get('/', (req, res, next) => {});

router.get('/:id', (req, res, next) => {
  let { id } = req.params;
  CustomerPlant.query()
    .where(id)
    .eager(['customer', 'plants'])
    .then(res => {
      console.log(res);
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
    'sunlight',
    'mood',
    'weekly_watering_schedule',
    'zoo'
  ]),
  (req, res, next) => {
    let {
      name,
      age,
      type,
      sunlight,
      mood,
      weekly_watering_schedule
    } = req.body;
    let created_at = new Date().toUTCString();
    let updated_at = new Date().toUTCString();
    console.log(req.user);
    let id = req.user.id;

    CustomerPlant.query()
      .insert({
        name,
        age,
        type,
        sunlight,
        mood,
        weekly_watering_schedule,
        created_at,
        updated_at,
        customer_id: id
      })
      .then(res => res.json(res))
      .catch(err => next(err));
  }
);

module.exports = router;
