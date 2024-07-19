const mongoose = require('mongoose');

const timeEntrySchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, // Duration in seconds
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    tags: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['InProgress', 'Completed', 'Interrupted'],
        default: 'InProgress'
    }
});

timeEntrySchema.pre('save', function(next) {
    // Calculate duration if endTime is present
    if (this.endTime) {
        this.duration = (this.endTime - this.startTime) / 1000; // Convert milliseconds to seconds
        this.status = 'Completed'; // Mark as completed if endTime is set
    }
    next();
});

module.exports = mongoose.model('TimeEntry', timeEntrySchema);
