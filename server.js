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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app
