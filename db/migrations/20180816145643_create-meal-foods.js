
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meal-foods', function(table) {
      table.increments('id').primary();
      table.integer('food_id')
        .references('id')
        .inTable('foods');
      table.integer('meal_id')
        .references('id')
        .inTable('meals');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meal-foods')
  ]);
};
