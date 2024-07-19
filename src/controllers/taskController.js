const Task = require('../models/Task');
const User = require('../models/User'); // Make sure the User model is imported correctly

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
                               .populate('category')
                               .populate('subtasks.assignee');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
                               .populate('category')
                               .populate('subtasks.assignee');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            subtasks: req.body.subtasks || []
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing task by ID
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                dueDate: req.body.dueDate,
                priority: req.body.priority,
                completed: req.body.completed,
                completionPercentage: req.body.completionPercentage,
                subtasks: req.body.subtasks
            }
        }, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.remove();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Complete a task and update user points
exports.completeTask = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = true;
        task.completionPercentage = 100;
        const updatedTask = await task.save();

        const user = await User.findById(userId);
        if (user) {
            user.points += 10;  // Assuming each task completion awards 10 points
            await user.save();
        }

        res.json({ updatedTask, userPoints: user.points });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
