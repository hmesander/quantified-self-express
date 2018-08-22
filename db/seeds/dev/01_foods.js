
exports.seed = function(knex, Promise) {
  return knex('foods').del()
  .then(function () {
    return knex('foods').insert([
      {name: 'Banana', calories: 60},
      {name: 'Oatmeal', calories: 120},
      {name: 'Chicken Noodle Soup', calories: 180},
      {name: 'Chocolate Chip Cookie', calories: 80},
      {name: 'Margarita', calories: 220}
    ])
  })
  .catch(error => console.log(`Error seeding foods: ${error}`))
};
