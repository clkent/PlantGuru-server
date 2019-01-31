exports.up = async function(knex, Promise) {
  await knex.schema.createTable('customers_plants', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('name').notNullable();
    t.string('age').notNullable();
    t.string('sunlight').notNullable();
    t.string('mood').notNullable();
    t.jsonb('weekly_watering_schedule').notNullable();
    t.dateTime('created_at').nullable();
    t.dateTime('updated_at').nullable();
    t.integer('customer_fk')
      .references('id')
      .inTable('customers');
    t.integer('plant_fk')
      .references('id')
      .inTable('plants');
  });
};

exports.down = function(knex, Promise) {};
