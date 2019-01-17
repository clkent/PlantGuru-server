'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const router = express.Router();
const customerLocalAuth = require('../strategies/local');
const customerJwtAuth = require('../strategies/jwt');

router.use(express.json());

function createAuthToken(customer) {
  return jwt.sign({ customer }, JWT_SECRET, {
    subject: customer.email,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/login', customerLocalAuth, (req, res) => {
  const customerAuthToken = createAuthToken(req.customer);
  res.json({ ...req.customer, customerAuthToken });
});

router.post('/refresh', customerJwtAuth, (req, res) => {
  const customerAuthToken = createAuthToken(req.customer);
  res.json({ ...req.customer, customerAuthToken });
});

module.exports = router;
