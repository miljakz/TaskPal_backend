const mongoose = require('mongoose');

// Define a Subtask Schema
const subtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false  // Making assignee optional
    },
    completed: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Number,
        default: 0, // Progress as a percentage from 0 to 100
        min: 0,
        max: 100
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],  // Set priorities as Low, Medium, or High
        default: 'Medium'
    }
});

// Main Task Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    completed: {
        type: Boolean,
        default: false  // Indicates if the task is completed or not
    },
    completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    subtasks: [subtaskSchema]  // Embedding Subtask Schema within the main Task Schema
});

module.exports = mongoose.model('Task', taskSchema);
