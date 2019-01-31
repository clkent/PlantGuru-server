'use strict';

const express = require('express');
const router = express.Router();

const Plant = require('../models/plant');

router.get('/', (req, res, next) => {
  Plant.query()
    .then(res => console.log(res))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  let { type } = req.body;
  let created_at = new Date().toUTCString();
  let updated_at = new Date().toUTCString();

  Plant.query()
    .insert({
      type,
      created_at,
      updated_at
    })
    .then(response => res.status(201).json(response.serialize()))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  let { id } = req.params;

  Plant.query()
    .where({ id })
    .then(res => console.log(res))
    .catch(err => next(err));
});

router.post('/:id', (req, res, next) => {});

module.exports = router;
