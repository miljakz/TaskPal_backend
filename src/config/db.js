const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,  // Ensure support for ensuring index
      useFindAndModify: false,  // Turn off find and modify to use native findOneAndUpdate()
      autoIndex: false,  // Don't build indexes automatically
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
    });
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
