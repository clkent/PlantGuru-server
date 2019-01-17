'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('plants', function(t) {
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plants');
};
