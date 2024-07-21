const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

module.exports = router;
