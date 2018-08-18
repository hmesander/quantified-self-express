
exports.seed = function(knex, Promise) {
  return knex('foods').del()
  .then(function () {
    return knex('foods').insert([
      {id: 1, name: 'Banana', calories: 60},
      {id: 2, name: 'Oatmeal', calories: 120},
      {id: 3, name: 'Chicken Noodle Soup', calories: 180},
      {id: 4, name: 'Chocolate Chip Cookie', calories: 80},
      {id: 5, name: 'Margarita', calories: 220}
    ])
  })
  .catch(error => console.log(`Error seeding foods: ${error}`))

  // knex.raw(SELECT setval(pg_get_serial_sequence('foods', 'id'), max(id)) FROM tbl);
};
