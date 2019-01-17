'use strict';

const { Model } = require('objection');

class Plant extends Model {
  static get tableName() {
    return 'plants';
  }

  //Model Relations
  static get relationMappings() {
    // Import models here to prevent require loops.
    const Customer = require('./customer');

    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'plants.customer_id',
          to: 'customers.id'
        }
      }
    };
  }
}

module.exports = Plant;
