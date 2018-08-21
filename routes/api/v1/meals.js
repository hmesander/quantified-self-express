const express = require('express');
const router = express.Router();
const MealsController = require('../../../controllers/meals-controller');

router.get('/', MealsController.index);
router.get('/:id/foods', MealsController.show);
router.post('/:meal_id/foods/:id', MealsController.create);
router.delete('/:meal_id/foods/:id', MealsController.destroy);

module.exports = router;
