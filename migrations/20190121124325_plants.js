exports.up = async function(knex, Promise) {
  await knex.schema.createTable('plants', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('name').notNullable();
    t.string('age').notNullable();
    t.string('type').notNullable();
    t.string('sunlight').notNullable();
    t.string('mood').notNullable();
    t.json('weekly-watering-schedule').notNullable();
    t.dateTime('created_at').nullable();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {};
