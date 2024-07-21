const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoryController');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

// @route   POST /api/categories
// @desc    Create a new category
// @access  Public
router.post('/', createCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Public
router.delete('/:id', deleteCategory);

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Public
router.put('/:id', updateCategory);

module.exports = router;
