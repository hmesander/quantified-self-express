const Meal = require('../models/meal');
const Food = require('../models/food');
const MealFood = require('../models/meal-food');

class MealsController {
  static index(request, response, next) {
    Meal.all()
    .then((meals) => {
      if (meals.length == 0) {
        response.status(404).json();
      } else {
        response.status(200).json(meals);
      }
    });
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

  static create(request, response, next) {
    Food.find(request.params.id)
    .then((food) => {
      Meal.find(request.params.meal_id)
      .then((meal) => {
        MealFood.create(request.params.meal_id, request.params.id)
        .then(() => {
          let message = `Successfully added ${food[0].name} to ${meal[0].name}`
          response.status(201).json({ message: message });
        });
      });
    });
  }

  static destroy(request, response, next) {
    Food.find(request.params.id)
    .then((food) => {
      Meal.find(request.params.meal_id)
      .then((meal) => {
        MealFood.destroy(request.params.meal_id, request.params.id)
        .then(() => {
          if (meal[0] && food[0]) {
            let message = `Successfully removed ${food[0].name} from ${meal[0].name}`
            response.status(200).json({ message: message });
          } else {
            response.status(404).json();
          }
        });
      });
    });
  }
}

module.exports = MealsController;
