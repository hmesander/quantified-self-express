const Meal = require('../models/meal');

class MealsController {
  static index(request, response, next) {
    Meal.all()
    .then((meals) => {
      if (meals.length == 0) {
        response.status(404).json();
      } else {
        response.status(200).json(meals);
      }
    })
  }

  static show(request, response, next) {
    let meal = Meal.find(request.params.id)
    .then(meal => {
      if (meal.length == 0) {
        response.status(404).json();
      } else {
        response.status(200).json(meal);
      }
    });
  }
}

module.exports = MealsController;
