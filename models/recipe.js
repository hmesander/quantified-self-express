const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const fetch = require('isomorphic-fetch');

class Recipe {
  static all(food_name) {
    return fetch(`http://api.yummly.com/v1/api/recipes?q=${food_name}`, {
      headers: {'Content-Type': 'application/json',
                'X-Yummly-App-ID': process.env.YUMMLYID,
                'X-Yummly-App-Key': process.env.YUMMLYKEY}
    })
    .then((response) => { return response.json() })
    .then((recipes) => {
      return { recipes: recipes.matches.map((recipe) => {
        return { name: recipe.recipeName, url: `http://www.yummly.com/recipe/${recipe.id}` }
      })
    }
    })
  }
}

module.exports = Recipe
