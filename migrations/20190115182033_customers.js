'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
    t.string('name').notNull();
    t.string('email').notNull();
    t.string('password').notNull();
    t.jsonb('plants').nullable();
    t.integer('guruId').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
