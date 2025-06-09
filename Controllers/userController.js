import express from 'express';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


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
        res.status(200).json({ message: 'User registered successfully' });

        // Generate token 
        const payload = { user: { id: newUser._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error ' });
    }
};


export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    // Validate input from user
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check if user password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Sign JWT token
        const token = jwt.sign(
            { user: { id: user._id } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, 
                    username: user.username, 
                    email: user.email 
                }, token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}