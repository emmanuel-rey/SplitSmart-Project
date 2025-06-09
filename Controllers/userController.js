import express from 'express';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        // res.status(200).json({ message: 'User registered successfully' });

        // Generate token 
        const payload = { user: { id: newUser._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error ' });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate token
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
    logger.error(`User registration failed: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
     }
}