exports.up = function(knex, Promise) {
  return knex.schema.table('customers', function(t) {
    t.integer('guru_id').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
