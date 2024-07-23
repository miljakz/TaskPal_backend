const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/User');

// Create a new user
router.post('/users', verifyToken, async (req, res) => {
  const { uid, email } = req.body;
  try {
    const newUser = new User({ uid, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
