'use strict';

const express = require('express');
const router = express.Router();
const { DB_URI } = require('../config');
const config = require('../knexfile.js');
const env = 'development';
const knex = require('../knex');
const CustomerPlant = require('../models/customer_plant');
const jwtAuth = require('../strategies/jwt');
const {
  requiredFieldsInBody,
  idValidator
} = require('../utilities/validators');

//protecting endpoints
router.use('/', jwtAuth);

//TODO: get endpoint
router.get('/', (req, res, next) => {});

//FIXME: fix join for type plant_fk
//GET by id
router.get('/:id', (req, res, next) => {
  let { id } = req.params;
  CustomerPlant.query()
    .where({ id })
    .eager(['customers', 'plants'])
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      next(err);
    });
});

//POST new plant
router.post(
  '/',
  idValidator,
  requiredFieldsInBody([
    'name',
    'age',
    'sunlight',
    'mood',
    'weekly_watering_schedule',
    'plant_fk'
  ]),
  (req, res, next) => {
    let {
      name,
      age,
      sunlight,
      mood,
      weekly_watering_schedule,
      plant_fk
    } = req.body;
    let created_at = new Date().toUTCString();
    let updated_at = new Date().toUTCString();

    let customer_fk = req.user.id;

    CustomerPlant.query()
      .insert({
        name,
        age,
        sunlight,
        mood,
        weekly_watering_schedule,
        plant_fk,
        customer_fk,
        created_at,
        updated_at
      })
      .then(response => res.json(response))
      .catch(err => next(err));
  }
);

module.exports = router;
