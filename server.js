const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'production';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

var foodsRouter = require('./routes/api/v1/foods');
var mealsRouter = require('./routes/api/v1/meals');
var favoriteFoodsRouter = require('./routes/api/v1/favorite-foods');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express API';

app.use(cors());
app.options('*', cors())

app.get('/', (request, response) => {
  response.send('Welcome to the Quantified Self - Express API!');
});

app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/favorite_foods', favoriteFoodsRouter);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app
