import mongoose from 'mongoose';
import Group from '../Models/groupModel.js';

//----------------
// Create a new group
//----------------


export const createGroup = async (req, res) => {
    const { name, description, members } = req.body;

    // Defensive: Check if req.user exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    const userId = req.user.id;

    // Check if group exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
        return res.status(400).json({ message: 'Group name already exists' });
    }

    // Validate input
    try {
        let validMembers = Array.isArray(members)
            ? members.filter(
                id => id && mongoose.Types.ObjectId.isValid(id) && id !== 'null'
            )
            : [];

        // Avoid duplicates and nulls
        if (!validMembers.includes(userId)) {
            validMembers.push(userId);
        }

        // Defensive measure: remove duplicates + null again
        validMembers = [...new Set(validMembers)].filter(Boolean);

        const group = new Group({
            name,
            description,
            members: validMembers,
            createdBy: userId,
        });

        // const userId = req.user.id;

        // Save the group to the database
        await group.save();
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating group', error: err.message });
    }
};

