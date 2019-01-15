'use strict';

const Customer = require('../models/customer');

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
      if (!customer.length) {
        const err = new Error('Email is not valid');
        err.status = 401;
        return Promise.reject(err);
      }
      return customer.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        const err = new Error('Password is invalid');
        err.status = 401;
        return Promise.reject(err);
      }
      req.customer = customer.serialize();
      return next();
    })
    .catch(next);
}

module.exports = customerLocalAuth;
