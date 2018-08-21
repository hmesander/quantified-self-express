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
    .then((food) => {
      if (food[0]) {
        response.status(200).json(food);
      } else {
        response.status(404).json();
      }
    });
  }

  static create(request, response, next) {
    const food = request.body.food;

    for (let requiredParameter of ['name', 'calories']) {
      if (!food[requiredParameter]) {
        return response
          .status(400).json()
      }
    }

    Food.create(food.name, food.calories)
    .then(food => Food.find(food[0]))
    .then(food => response.status(201).json(food[0]));
  }

  static destroy(request, response, next) {
    Food.destroy(request.params.id)
    .then((food) => {
      if (food) {
        response.status(204).json();
      } else {
        response.status(404).json();
      }
    })
  }

  static update(request, response, next) {
    let foodParams = request.body.food

    for (let requiredParameter of ['name', 'calories'])
      if (!foodParams[requiredParameter]) {
        return response.status(404).json();
      }

    Food.update(request.params.id, foodParams.name, foodParams.calories)
    .then(food => Food.find(food[0]))
    .then(food => response.status(200).json(food));
  }
}

module.exports = FoodsController;
