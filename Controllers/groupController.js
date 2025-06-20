import mongoose from 'mongoose';
import Group from '../Models/groupModel.js';
import User from '../Models/userModel.js';
import { sendEmail } from '../../utils/sendEmail.js';

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

        //fetch memmbers email
        const members = await User.find({_id:{$in:validMembers}});

        for(const user of members){
            if(user._id.toString() !== userId){
                
                //save DB
                await Notification.create({
                    user: user._id,
                    message: `You've been added to the group "${name}".`,
                    type: 'group_invite',
                    group: group._id
                });
                
                await sendEmail({
                    to: user.email,
                    subject: 'You have been added to a new group',
                    text: `Hello ${user.username},\n\nYou have been added to the group "${name}" by ${req.user.username}.\n\nDescription: ${description}\n\nBest regards,\nSplitSmart Team`
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating group', error: err.message });
    }
};

export const getAllGroups = async (req, res) => {

    try {

        const userId = req.user.id;

        const groups = await Group.find({members:userId})
        .populate('members', 'username email')
        .populate('createdBy', 'username email');

        res.status(200).json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching groups', error: err.message });
    }
};

export const getGroupById = async (req, res) => {

    try{
        const group = await Group.findById(req.params.id)
            .populate('members', 'username email')
            .populate('createdBy', 'username email');

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json(group);
    }catch(error){
        res.status(500).json({ message: 'Error fetching group', error: error.message });
    }
};

