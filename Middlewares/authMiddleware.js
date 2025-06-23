import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';

export const protect = async (req, res, next) => {
    let token;


    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded JWT payload:', decoded);
            console.log('Looking for user with email:', decoded.user.email);

            const user = await User.findOne({ email: decoded.user.email });
            console.log('User found:', user);
            
            if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = {
            email: user.email,
            name: user.name,
            id: user._id,
        };

        next();
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
    res.status(401).json({ message: 'Not authorized, no token' });
    }
};
