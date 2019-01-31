exports.up = async function(knex, Promise) {
  await knex.schema.createTable('plants', function(t) {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('type').notNullable();
    t.dateTime('created_at');
    t.dateTime('updated_at');
  });
};

exports.down = function(knex, Promise) {};
