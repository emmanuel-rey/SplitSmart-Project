import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import mongoose from "mongoose";
import app from "./app.js"
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import expenseRoutes from "./Routes/expenseRoute.js";
import settlementRoutes from "./Routes/settlementRoute.js";


dotenv.config();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
// mongoose.connect('mongodb://localhost:27017/splitsmart', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
import groupRoutes from "./Routes/groupRoute.js";
import userRoutes from "./Routes/userRoute.js";

// User routes
app.use('/api/users', userRoutes);

// Group routes
app.use('/api/groups', groupRoutes);

// Expense routes
app.use('/api/expenses', expenseRoutes);

// Settlement routes
app.use('/api/settlements', settlementRoutes);

// Test route
app.get('/', (_req, res) => {
    res.send('SplitSmart API is running...');
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
