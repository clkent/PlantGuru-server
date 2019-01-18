'use strict';

const Customer = require('../models/customer');
const Guru = require('../models/guru');

function customerLocalAuth(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Missing email or password');
    err.status = 400;
    return next(err);
  }

  let customer;
  Customer.query()
    .where({ email })
    .then(customers => {
      customer = customers[0];
      //TODO: some other if - customer.length doesn't work because it's an obj
      // if (!customer.length) {
      //   const err = new Error('Email is not valid');
      //   err.status = 401;
      //   return Promise.reject(err);
      // }
      return customer.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        const err = new Error('Password is invalid');
        err.status = 401;
        return Promise.reject(err);
      }
      req.user = customer.serialize();
      return next();
    })
    .catch(next);
}

function guruLocalAuth(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Missing email or password');
    err.status = 400;
    return next(err);
  }

  let guru;
  Guru.query()
    .where({ email })
    .then(gurus => {
      guru = gurus[0];
      //TODO: some other if - customer.length doesn't work because it's an obj
      // if (!customer.length) {
      //   const err = new Error('Email is not valid');
      //   err.status = 401;
      //   return Promise.reject(err);
      // }
      return guru.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        const err = new Error('Password is invalid');
        err.status = 401;
        return Promise.reject(err);
      }
      req.user = guru.serialize();
      return next();
    })
    .catch(next);
}

module.exports = { customerLocalAuth, guruLocalAuth };
