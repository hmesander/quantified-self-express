const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var foodsRouter = require('./routes/api/v1/foods');
var mealsRouter = require('./routes/api/v1/meals');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express API';

app.get('/', (request, response) => {
  response.send('Welcome to the Quantified Self - Express API!');
});

app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);

// app.get('/api/v1/meals', (request, response) => {
//   database('meals').select('id', 'name')
//   .then((meals) => {
//     if (meals.length == 0) {
//       response.status(404).json();
//     } else {
//       response.status(200).json(meals);
//     }
//   })
//   .catch(error => {
//     response.status(500).json({ error });
//   });
// });

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
    response.status(404).json({ error });
  });
});

app.delete('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  database('meal-foods').where({ food_id: request.params.id, meal_id: request.params.meal_id }).select('id', 'meal_id', 'food_id')
  .then((meal_food) => {
    database('meal-foods').where({ food_id: meal_food[0].food_id, meal_id: meal_food[0].meal_id }).select('meal_id', 'food_id').del()
    .then(() => {
      database('meals').where('id', meal_food[0].meal_id).select('name')
      .then((meal_name) => {
        database('foods').where('id', meal_food[0].food_id).select('name')
        .then((food_name) => {
          response.status(200).json({ message: `Successfully removed ${food_name[0].name} from ${meal_name[0].name}` });
        })
      })
    })
  })
  .catch(error => {
    response.status(404).json({ error });
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app
