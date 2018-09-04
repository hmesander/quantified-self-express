const MealFood = require('../models/meal-food');

class FavoriteFoodsController {
  static index(request, response, next) {
    MealFood.favorite()
    .then(function(favorites) {
      if(!favorites.rows) {
        return response.sendStatus(404)
      } else {
        return response.json(favorites.rows)
      }
    });
  };
}

module.exports = FavoriteFoodsController;
