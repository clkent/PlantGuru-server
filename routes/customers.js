'use strict';

const express = require('express');
const Customer = require('../models/customer');
// const validateUser = require('./validation/user');

const router = express.Router();

//TODO: add middleware validateUser
//------------  POST  ------------
router.post('/', (req, res, next) => {
  const { password, email, name } = req.body;

  Customer.query()
    .where({ email })
    .first()
    .then(customer => {
      if (customer) {
        const err = new Error('User with this email already exists');
        err.status = 400;
        return Promise.reject(err);
      }
      return Customer.hashPassword(password);
    })
    .then(hash => {
      return Customer.query().insert({ email, password: hash, name });
    })
    .then(customer => {
      return res.status(201).json(customer.serialize());
    })
    .catch(next);
});

//------------  GET  ------------
router.get('/:id', (req, res, next) => {
  const customerId = req.params.id;

  return Customer.query()
    .where({ id: customerId })
    .then(results => {
      if (!results.length) return Promise.reject();
      const item = results[0];

      const customer = {
        customerId: item.id,
        guruId: item.guruId,
        plants: item.plants
      };

      return res.json(customer);
    })
    .catch(next);
});

//------------  PUT  ------------
router.put('/:id', (req, res, next) => {
  const customerId = req.params.id;
  let plants = null;
  let guruId = null;

  if (req.body.plants) {
    plants = req.body.plants;

    return Customer.query()
      .update({ plants })
      .where({ id: customerId })
      .returning('*')
      .first()
      .then(plants => {
        if (!plants) {
          return Promise.reject();
        }
        return res.status(201).json(plants);
      })
      .catch(next);
  }

  if (req.body.guruId) {
    guruId = req.body.guruId;

    return Customer.query()
      .update({ guruId: guruId })
      .where({ id: customerId })
      .returning('*')
      .first()
      .then(plants => {
        if (!plants) {
          return Promise.reject();
        }
        return res.status(201).json(plants);
      })
      .catch(next);
  }
});

module.exports = router;