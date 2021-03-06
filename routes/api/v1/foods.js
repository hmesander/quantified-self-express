const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foods-controller');
const RecipesController = require('../../../controllers/recipes-controller');

router.get('/', FoodsController.index);
router.get('/:id/recipes', RecipesController.index);
router.get('/:id', FoodsController.show);
router.post('/', FoodsController.create);
router.delete('/:id', FoodsController.destroy);
router.patch('/:id', FoodsController.update);

module.exports = router;
