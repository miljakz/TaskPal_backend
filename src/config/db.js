const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
      console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected...');
    });

  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  // Close the Mongoose connection, when receiving SIGINT
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

module.exports = connectDB;
