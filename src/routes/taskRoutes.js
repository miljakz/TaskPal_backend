const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    completeTask,  // Function for completing tasks
    addSubtask,    // Function to add a subtask
    updateSubtask, // Function to update a subtask
    deleteSubtask  // Function to delete a subtask
} = require('../controllers/taskController');

// Routes for main tasks
router.get('/', getAllTasks);                    // Get all tasks
router.get('/:id', getTask);                     // Get a single task by ID
router.post('/', createTask);                    // Create a new task
router.put('/:id', updateTask);                  // Update an existing task by ID
router.delete('/:id', deleteTask);               // Delete a task by ID
router.post('/:id/complete', completeTask);      // Complete a task by ID

// Routes for subtasks within a task
router.post('/:taskId/subtasks', addSubtask);             // Add a subtask to a task by ID
router.put('/:taskId/subtasks/:subtaskId', updateSubtask); // Update a subtask by ID within a task
router.delete('/:taskId/subtasks/:subtaskId', deleteSubtask); // Delete a subtask by ID within a task

module.exports = router;
