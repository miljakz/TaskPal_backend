const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    completeTask,
    addSubtask,   
    updateSubtask, 
    deleteSubtask 
} = require('../controllers/taskController');


router.get('/', getAllTasks);


router.get('/:id', getTask);


router.post('/', createTask);


router.put('/:id', updateTask);


router.delete('/:id', deleteTask);


router.post('/:id/complete', completeTask);

router.post('/:taskId/subtasks', addSubtask);

router.put('/:taskId/subtasks/:subtaskId', updateSubtask);

router.delete('/:taskId/subtasks/:subtaskId', deleteSubtask);

module.exports = router;
