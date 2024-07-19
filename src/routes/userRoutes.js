const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user/:id/pomodoro/start', userController.startPomodoroSession);
router.post('/user/:id/pomodoro/complete', userController.completePomodoroSession);
router.put('/user/:id/pomodoro/settings', userController.updatePomodoroSettings);

module.exports = router;
