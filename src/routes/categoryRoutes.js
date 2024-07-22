const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoryController');

// Get all categories
router.get('/', getCategories);

// Create a new category
router.post('/', createCategory);

// Delete a category
router.delete('/:id', deleteCategory);

// Update a category
router.put('/:id', updateCategory);

module.exports = router;
