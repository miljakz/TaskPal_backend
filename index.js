const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
