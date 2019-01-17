'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('plants', function(t) {
    t.integer('customerId').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plants');
};
