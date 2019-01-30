'use strict';

const { Model } = require('objection');

class CustomerPlant extends Model {
  static get tableName() {
    return 'plants';
  }

  //Model Relations
  static get relationMappings() {
    // Import models here to prevent require loops.
    const Customer = require('./customer');
    const Plant = require('./plant');
    return {
      customers: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'customers_plants.customer_fk',
          to: 'customers.id'
        }
      },
      plants: {
        relation: Model.BelongsToOneRelation,
        modelClass: Plant,
        join: {
          from: 'customers_plants.plant_fk',
          to: 'plants.id'
        }
      }
    };
  }
}

module.exports = CustomerPlant;
