
exports.seed = function(knex, Promise) {
  return knex('foods').del()
  .then(function () {
    return knex('foods').insert([
      {id: 1, name: 'Banana', calories: 60},
      {id: 2, name: 'Oatmeal', calories: 120}
    ])
  })
  .then(() => console.log('Seeding foods complete!'))
  .catch(error => console.log(`Error seeding foods: ${error}`))
};
