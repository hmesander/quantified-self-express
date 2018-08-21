const MealFood = require('../models/meal-food');

class MealFoodsController {
  static create(request, response, next) {
    console.log('HERE')
    Food.find(request.params.id)
    .then((food) => {
      Meal.find(request.params.meal_id)
      .then((meal) => {
        MealFood.create(request.params.meal_id, request.params.id)
        .then(meal => {
          let message = ``
          response.status(201).json(response.status(201).json(message));
        });
      });
    });
  }
}

module.exports = MealFoodsController;
