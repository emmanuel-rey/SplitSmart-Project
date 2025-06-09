import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerOptions from './config/swagger.js'; // Import your config


dotenv.config();

// Initialize express app and connect to the database
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
// mongoose.connect('?mongodb://localhost:27017/splitsmart', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
import userRoutes from "./Routes/userRoute.js";
import groupRoutes from "./Routes/groupRoute.js";
app.use('/api/users', userRoutes);

// Group routes
app.use('/api/groups', groupRoutes);

// Test route
app.get('/', (_req, res) => {
    res.send('SplitSmart API is running...');
});

app.get('/health', (_req,res) => {
    res.status(200).json(
        {
            status: "Good",
            message: "SplitSmart API is running smoothly",
            dbstatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
            timestamp: new Date()
        }
    );
});

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on https://localhost: ${PORT}`));
