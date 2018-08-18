const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express API';

app.get('/', (request, response) => {
  response.send('Welcome to the Quantified Self - Express API!');
});

app.get('/api/v1/foods', (request, response) => {
  database('foods').select('id', 'name', 'calories')
  .then((foods) => {
    if (foods.length == 0) {
      response.status(404).json();
    } else {
      response.status(200).json(foods);
    }
  })
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select('id', 'name', 'calories')
  .then((food) => {
    if (food.length == 0) {
      response.status(404).json();
    } else {
      response.status(200).json(food);
    }
  })
})

app.post('/api/v1/foods', (request, response) => {
  const food = request.body.food;

  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response
        .status(400).json()
    }
  }

  database('foods').insert(food, 'id')
  .then((id) => {
    database('foods').where('id', id[0]).select('id', 'name', 'calories')
    .then((food) => {
      response.status(201).json(food[0])
    })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.delete('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id

  database('foods').where('id', id).select('id')
  .then((food) => {
    database('foods').where('id', food[0].id).del()
    .then(() => {
      response.status(204).json()
    })
  })
  .catch(error => {
    response.status(404).json();
  });
});

app.patch('/api/v1/foods/:id', (request, response) => {
  const food_info = request.body.food;

  database('foods').where('id', request.params.id).select('id')
  .then((retrieved_food) => {
    database('foods').where({ id: retrieved_food[0].id }).update(food_info, 'id')
    .then((id) => {
      database('foods').where('id', id[0]).select('id', 'name', 'calories')
      .then((new_food) => {
        response.status(200).json(new_food)
      })
    })
    .catch(error => {
      response.status(404).json({ error });
    });
  })
  .catch(error => {
    response.status(404).json({ error });
  });
});

app.get('/api/v1/meals', (request, response) => {
  database('meals').select('id', 'name')
  .then((meals) => {
    if (meals.length == 0) {
      response.status(404).json();
    } else {
      response.status(200).json(meals);
    }
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/meals/:id/foods', (request, response) => {
  database('meals').where('id', request.params.id).select('id', 'name')
  .then((meal) => {
    if (meal.length == 0) {
      response.status(404).json();
    } else {
      response.status(200).json(meal);
    }
  })
})

app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  database('meal-foods').insert({ food_id: request.params.id, meal_id: request.params.meal_id }, 'id')
  .then((id) => {
    database('meal-foods').where('id', id[0]).select('meal_id', 'food_id')
    .then((ids) => {
      database('meals').where('id', ids[0].meal_id).select('name')
      .then((meal_name) => {
        database('foods').where('id', ids[0].food_id).select('name')
        .then((food_name) => {
          response.status(201).json({ message: `Successfully added ${food_name[0].name} to ${meal_name[0].name}` });
        })
      })
    })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app
