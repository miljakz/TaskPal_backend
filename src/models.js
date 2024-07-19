const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true }
});

const TaskSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', CategorySchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = { Category, Task };
