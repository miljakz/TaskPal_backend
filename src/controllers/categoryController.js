const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Public
const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Public
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.remove();
    res.json({ message: 'Category removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Public
const updateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
};
