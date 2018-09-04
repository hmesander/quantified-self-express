const MealFood = require('../models/meal-food');

class FavoriteFoodsController {
  static index(request, response, next) {
    MealFood.favorite()
    .then(function(favorites) {
      return response.json(favorites)
    });
  };
}

module.exports = FavoriteFoodsController;
