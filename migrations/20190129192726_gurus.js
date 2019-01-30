exports.up = function(knex, Promise) {
  return knex.schema.createTable('gurus', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.string('name').notNull();
    t.string('email').notNull();
    t.string('password').notNull();
    t.jsonb('customers').nullable();
    t.jsonb('plant_specialty').nullable();
  });
};

exports.down = function(knex, Promise) {};
