const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class MealFood {
  static create(meal_id, food_id) {
    return database('meal-foods').insert({ meal_id: meal_id, food_id: food_id }, 'id');
  }

  static destroy(meal_id, food_id) {
    return database('meal-foods').where({ meal_id: meal_id, food_id: food_id }).del();
  }
}

module.exports = MealFood;
