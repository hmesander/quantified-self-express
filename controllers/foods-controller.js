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

  static show(request, response, next) {
    let food = Food.find(request.params.id)
    .then(food => {
      if (food) {
        response.status(200).json(food);
      } else {
        response.status(404).json();
      }
    });
  }
}

module.exports = FoodsController;
