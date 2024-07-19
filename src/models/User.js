const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  points: {
    type: Number,
    default: 0
  },
  badges: [{
    badgeName: {
      type: String,
      required: true
    },
    dateEarned: {
      type: Date,
      default: Date.now
    }
  }],
  pomodoroSessions: {
    count: {
      type: Number,
      default: 0
    },
    sessionLength: {
      type: Number,
      default: 1500,
      validate: {
        validator: function(value) {
          return value % 300 === 0; // Ensures session lengths are multiples of 5 minutes
        },
        message: props => `${props.value} is not a valid session length!`
      }
    }
  },
  workSessions: [{
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { 
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return value >= 0;
        },
        message: props => `Work session duration must be a positive number`
      }
    }
  }],
  roles: [{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }],
  activityLogs: [{
    action: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Middleware to hash password before saving if it's modified
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
