'use strict';

const express = require('express');
const Guru = require('../models/guru');
// const validateUser = require('./validation/user');

const router = express.Router();

//TODO: add middleware validateUser
//------------  POST  ------------
router.post('/', (req, res, next) => {
  const { password, email, name } = req.body;

  Guru.query()
    .where({ email })
    .first()
    .then(guru => {
      if (guru) {
        const err = new Error('User with this email already exists');
        err.status = 400;
        return Promise.reject(err);
      }
      return Guru.hashPassword(password);
    })
    .then(hash => {
      return Guru.query().insert({
        email,
        password: hash,
        name,
        created_at: new Date(),
        updated_at: new Date()
      });
    })
    .then(guru => {
      return res.status(201).json(guru.serialize());
    })
    .catch(next);
});

//------------  GET  ------------
router.get('/:id', (req, res, next) => {
  const guruId = req.params.id;

  return Guru.query()
    .where({ id: guruId })
    .then(results => {
      if (!results.length) return Promise.reject();
      const item = results[0];

      const guru = {
        // guru_id: item.id,
        customers: item.customers
      };

      return res.json(guru);
    })
    .catch(next);
});

//------------  PUT  ------------
router.put('/:id', (req, res, next) => {
  const guruId = req.params.id;
  let customers = req.body.customers;

  return Guru.query()
    .update({ customers })
    .where({ id: guruId })
    .returning('*')
    .first()
    .then(guru => {
      if (!guru) {
        return Promise.reject();
      }
      return res.status(201).json(guru);
    })
    .catch(next);
});

module.exports = router;
