const dotenv = require("dotenv");
import groupRoutes from './Routes/groupRoute.js';
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

// Initialize express app and connect to the database
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect('mongodb://localhost:27017/splitsmart', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/users', require('./Routes/userRoute.js'));

// Group routes
app.use('/api/groups', groupRoutes);

// Test route
app.get('/', (_req, res) => {
    res.send('SplitSmart API is running...');
});

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server running on https://localhost: ${PORT}`));
