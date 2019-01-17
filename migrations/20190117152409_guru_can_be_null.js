'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('customers', function(t) {
    t.dropColumn('guru_id');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
