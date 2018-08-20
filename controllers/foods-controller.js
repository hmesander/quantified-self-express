const Food = require('../models/food');

class FoodsController {
  static index(request, response, next) {
    Food.all()
    .then((foods) => {
      if (foods.length == 0) {
        response.status(404).json();
      } else {
        response.status(200).json(foods);
      }
    })
  }
}

module.exports = FoodsController;
