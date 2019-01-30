'use strict';

const { Model } = require('objection');

class Plant extends Model {
  static get tableName() {
    return 'plants';
  }

  //Model Relations
  static get relationMappings() {
    // Import models here to prevent require loops.
    const CustomerPlant = require('./customer_plant');

    return {
      customers_plants: {
        relation: Model.HasManyRelation,
        modelClass: CustomerPlant,
        join: {
          from: 'plants.id',
          to: 'customers_plants.plant_fk'
        }
      }
    };
  }
}

module.exports = Plant;
