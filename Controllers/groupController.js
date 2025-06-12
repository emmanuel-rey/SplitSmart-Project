import Group from '../Models/groupModel.js';
// import User from '../Models/userModel.js';

//Create a new group

export const createGroup = async (req, res) => {
    const { name,description,members} = req.body;
    const userId = req.user.id;

    // Check if the group name already exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
        return res.status(400).json({ message: 'Group name already exists' });
    }

    try {
        const group = new Group({
            name,
            description,
            members: Array.isArray(members) ? [...members, userId] : [userId], // create a new group with the creator as a member
            createdBy: userId
        });

        await group.save();
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating group', error: err.message });
    }
};


// export { createGroup };