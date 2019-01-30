exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.string('name').notNull();
    t.string('email').notNull();
    t.string('password').notNull();
    t.integer('guru_id').nullable();
    t.boolean('subscribed').notNull();
  });
};

exports.down = function(knex, Promise) {};
