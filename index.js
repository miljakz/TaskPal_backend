const express = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');               
const connectDB = require('./config/db');   
require('dotenv').config();                 

const app = express();
const PORT = process.env.PORT || 5000;      

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());                            
app.use(bodyParser.json());                 

// Routes
app.use('/api/categories', require('./routes/categoryRoutes'));  
app.use('/api/tasks', require('./routes/taskRoutes'));           

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); /
});
