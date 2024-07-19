const User = require('../models/User');

// Function to complete a Pomodoro session
exports.completePomodoroSession = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Increment the Pomodoro session count
        user.pomodoroSessions.count += 1;
        // Log this activity
        user.activityLogs.push({
            action: 'Completed a Pomodoro session',
            date: new Date()
        });
        await user.save();
        res.status(200).json({
            message: 'Pomodoro session completed successfully',
            sessionCount: user.pomodoroSessions.count
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Function to update Pomodoro settings
exports.updatePomodoroSettings = async (req, res) => {
    const { sessionLength } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { '$set': {'pomodoroSessions.sessionLength': sessionLength}},
            { new: true, runValidators: true } // Ensure validators run on update
        );
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Log this change
        user.activityLogs.push({
            action: 'Updated Pomodoro session length',
            date: new Date()
        });
        await user.save();
        res.status(200).json({
            message: 'Pomodoro settings updated successfully',
            settings: user.pomodoroSessions
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};