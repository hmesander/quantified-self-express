
exports.seed = function(knex, Promise) {
  return knex('meal-foods').del()
  .then(function () {
    return knex('meal-foods').insert([
      {meal_id: 1, food_id: 1},
      {meal_id: 1, food_id: 2},
      {meal_id: 2, food_id: 1},
    ])
  })
  .catch(error => console.log(`Error seeding meal-foods: ${error}`))
};
