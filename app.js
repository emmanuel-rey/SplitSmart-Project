import express from 'express';
import userRoutes from './Routes/userRoute.js';
import groupRoutes from './Routes/groupRoute.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

export default app;
