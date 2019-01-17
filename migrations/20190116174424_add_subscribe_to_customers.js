'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('customers', function(t) {
    t.boolean('subscribed').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
