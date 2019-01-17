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

  //Model Relations
  static get relationMappings() {
    // Import models here to prevent require loops.
    const Plant = require('./plant');

    return {
      plants: {
        relation: Model.HasManyRelation,
        modelClass: Plant,
        join: {
          from: 'customers.id',
          to: 'plants.customer_id'
        }
      }
    };
  }
}

module.exports = Customer;
