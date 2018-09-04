const Food = require('../models/food')
const Recipe = require('../models/recipe')

class RecipeController {
  static index(request, response, next) {
    Food.find(request.params.id)
    .then(food => {
      if(food[0]) {
        Recipe.all(food[0].name)
        .then(recipes => response.json(recipes))
      } else {
        response.sendStatus(404)
      }
    })
  }
}
module.exports = RecipeController;
