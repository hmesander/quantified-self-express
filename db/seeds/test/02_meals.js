
exports.seed = function(knex, Promise) {
  return knex('meals').del()
  .then(function () {
    return knex('meals').insert([
      {name: 'Breakfast'},
      {name: 'Snack'},
      {name: 'Lunch'},
      {name: 'Dinner'}
    ])
  })
  .catch(error => console.log(`Error seeding meals: ${error}`))
};
