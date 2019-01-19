'use strict';
const { Model } = require('objection');
const bcrypt = require('bcryptjs');

class Guru extends Model {
  static get tableName() {
    return 'gurus';
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

  //Model Relations
  static get relationMappings() {
    // Import models here to prevent require loops.
    const Customer = require('./customer');

    return {
      customers: {
        relation: Model.HasManyRelation,
        modelClass: Customer,
        join: {
          from: 'gurus.id',
          to: 'customers.guru_id'
        }
      }
    };
  }
}

module.exports = Guru;
