const express = require('express');
const router = express.Router();
const FoodsController = require('../../../controllers/foods-controller');

router.use(cors(options));
router.options("*", cors(options));

router.get('/', FoodsController.index);
router.get('/:id', FoodsController.show);
router.post('/', FoodsController.create);
router.delete('/:id', FoodsController.destroy);
router.patch('/:id', FoodsController.update);

module.exports = router;
