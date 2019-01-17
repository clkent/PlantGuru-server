'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('plants', function(t) {
    t.dropColumn('customerId');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plants');
};
