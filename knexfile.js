'use strict';

const { DB_URI, TEST_DB_URI } = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: DB_URI
  }
};
