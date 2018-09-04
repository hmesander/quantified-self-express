
exports.seed = function(knex, Promise) {
  return knex('meal_foods').del()
  .then(function () {
    return knex('meal_foods').insert([
      {meal_id: 1, food_id: 1},
      {meal_id: 2, food_id: 1},
      {meal_id: 3, food_id: 1},
      {meal_id: 4, food_id: 1},
      {meal_id: 1, food_id: 2},
      {meal_id: 2, food_id: 2},
      {meal_id: 3, food_id: 2},
      {meal_id: 4, food_id: 2},
      {meal_id: 1, food_id: 3},
      {meal_id: 2, food_id: 3},
      {meal_id: 3, food_id: 3},
      {meal_id: 1, food_id: 4},
      {meal_id: 2, food_id: 4},
      {meal_id: 1, food_id: 5},
      {meal_id: 2, food_id: 5},
    ])
  })
  .catch(error => console.log(`Error seeding meal_foods: ${error}`))
};
