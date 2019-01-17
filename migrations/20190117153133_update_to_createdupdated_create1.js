'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('customers', function(t) {
    t.dropColumn('deletedAt');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
