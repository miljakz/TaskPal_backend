const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');

// Route to start a new time entry for a specific task
router.post('/start', timeController.startTime);

// Route to stop a time entry by its unique identifier
router.post('/stop/:id', timeController.stopTime);

// Route to retrieve all time entries for a specific task
router.get('/entries/:taskId', timeController.getTimeEntries);

// Route to update an existing time entry, useful for manual adjustments or corrections
router.put('/update/:id', timeController.updateTimeEntry);

// Route to delete a time entry, useful if an entry was created by mistake or no longer needed
router.delete('/delete/:id', timeController.deleteTimeEntry);

module.exports = router;
