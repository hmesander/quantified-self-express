const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class MealFood {
  static create(meal_id, food_id) {
    return database('meal_foods').insert({ meal_id: meal_id, food_id: food_id }, 'id');
  }

  static destroy(meal_id, food_id) {
    return database('meal_foods').where({ meal_id: meal_id, food_id: food_id }).del();
  }

  static favorite() {
    return database.raw(`SELECT DISTINCT(sub.timesEaten) as timesEaten, array_agg(jsonb_build_object('name', foods.name, 'calories', foods.calories)) as foods
                  FROM (SELECT DISTINCT COUNT(food_id) as timesEaten, food_id
                        FROM meal_foods, meals
                        WHERE meals.id = meal_foods.meal_id
                        GROUP BY meal_foods.food_id) sub, foods
                  WHERE foods.id = sub.food_id
                  GROUP BY sub.timesEaten
                  ORDER BY sub.timesEaten DESC;`)

  }
}

module.exports = MealFood;
