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
    t.dateTime('createdAt').nullable();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('plants');
};
