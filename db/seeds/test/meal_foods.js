exports.seed = function(knex, Promise) {
  return knex('meal_foods').del()
  .then(function () {
    return knex('meal_foods').insert([
      {id: 1, food_id: 1, meal_id: 1},
      {id: 2, food_id: 2, meal_id: 1},
      {id: 3, food_id: 3, meal_id: 2},
    ])
  })
  .catch(error => console.log(`Error seeding meal_foods: ${error}`))
};
