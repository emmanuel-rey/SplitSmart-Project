import Group from '../Models/groupModel.js';


export const createGroup = async (req, res) => {
    const { name, description, members } = req.body;

    if (!req.user || !req.user.email) {
        return res.status(401).json({ message: 'Unauthorized: User email missing' });
    }

    const userEmail = req.user.email;

    try {
        // Check if group with same name exists
        const existingGroup = await Group.findOne({ name });

        if (existingGroup) {
        return res.status(400).json({ message: 'Group name already exists' });
        }

        // Clean members list and ensure creator is included
        let validMembers = Array.isArray(members)
        ? members.map(email => email?.trim().toLowerCase()).filter(Boolean)
        : [];

        if (!validMembers.includes(userEmail)) {
        validMembers.push(userEmail);
        }

    validMembers = [...new Set(validMembers)]; // remove duplicates

    const group = new Group({
        name,
        description,
            members: validMembers,
        createdBy: userEmail,
        });

    await group.save();

    res.status(201).json({ message: 'Group created successfully', group });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating group', error: err.message });
    }
};



// Get 

export const getGroupById = async (req, res) => {
    const { id } = req.params;

    try {
        const group = await Group.findById(id);

        if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching group', error: error.message });
    }
};


// Delete

export const deleteGroup = async (req, res) => {
    const { id } = req.params;

    try {
        const group = await Group.findById(id);

        if (!group) {
        return res.status(404).json({ message: 'Group not found' });
        }

        // Optional: Add permission check
        // if (group.createdBy !== req.user.email) {
        //   return res.status(403).json({ message: 'Not authorized to delete this group' });
        // }

        await group.deleteOne();

        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ message: 'Error deleting group', error: error.message });
    }
};
