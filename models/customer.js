'use strict';

const { Model } = require('objection');
const bcrypt = require('bcryptjs');

class Customer extends Model {
  static get tableName() {
    return 'customers';
  }

  static hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
}

module.exports = Customer;
