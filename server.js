const dotenv = require("dotenv");
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const userRoutes = require("./Routes/userRoute");

dotenv.config();

// Initialize express app and connect to the database
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// // DB connection
mongoose.connect('mongodb://localhost:27017/splitsmart', { useNewUrlParser: true, useUnifiedTopology: true });
// After user.save()
console.log('User saved:', user);



// Routes
app.use('/api/users', require('./Routes/userRoute.js'));


// Test route
app.get('/', (req, res) => {
    res.send('SplitSmart API is running...');
});

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server running on https://localhost: ${PORT}`));
