
exports.seed = function(knex, Promise) {
  return knex('foods').del()
  .then(function () {
    return knex('foods').insert([
      {name: 'Banana', calories: 60},
      {name: 'Oatmeal', calories: 120},
      {name: 'Pop Tart', calories: 180},
      {name: 'Soup', calories: 110},
      {name: 'Crackers', calories: 150},
      {name: 'Cheese', calories: 220},
      {name: 'Pancakes', calories: 150},
    ])
  })
  .catch(error => console.log(`Error seeding foods: ${error}`))
};
