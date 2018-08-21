const express = require('express');
const router = express.Router();
const MealFoodsController = require('../../../controllers/meal-foods-controller');

router.post('/:meal_id/foods/:id', MealFoodsController.create);

module.exports = router;
