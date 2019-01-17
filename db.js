'use strict';

const { DB_URI } = require('./config');
const config = require('./knexfile.js');
const env = 'development';
const knex = require('./knex');
const { Model } = require('objection');

function dbConnect(url = DB_URI) {
  knex();
  Model.knex(knex);
}

// function createTables(knex) {}

// function dropTables(knex) {}

function dbDisconnect() {
  return knex.destroy();
}

function dbGet() {
  return knex;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet,
  //   createTables,
  //   dropTables,
  knex
};
