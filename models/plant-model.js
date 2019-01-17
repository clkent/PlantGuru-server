const { Model } = require('objection');

class Plants extends Model {
  static get tableName() {
    return 'plants';
  }
}

module.exports = Plants;
