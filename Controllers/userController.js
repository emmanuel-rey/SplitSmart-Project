const e = require('express');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        // Check if user already exists
        existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({message: 'User already exists'});

        // Create new user
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(200).json({message: 'User registered successfully'});

        // Generate token 
        const payload = {user : {id : newUser._id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        // res.status(201).json({message: 'User registered successfully',
        //     token, user: {id: newUser._id, username: newUser.username, email: newUser.email}});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error '});
    }
}

