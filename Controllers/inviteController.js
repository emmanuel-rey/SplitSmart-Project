import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js';
import Group from '../Models/groupModel.js';
import sendEmail from '../Services/sendEmails.js';


// Function to send invite email

export const sendGroupInvite = async (req, res) => {
    const { groupId } = req.params;
    const { email } = req.body;

    if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Function to generate token that encodes user + group info
        const token = jwt.sign(
            { userId: user._id, groupId },
        process.env.INVITE_SECRET,
        { expiresIn: '1h' }
        );

        const joinLink = `https://splitsmart-project.onrender.com/api/invite/accept?token=${token}`;

        console.log(`📩 [DEV LOG] Invite link: ${joinLink}`);

        await sendEmail({
        to: email,
        subject: 'SplitSmart Group Invite',
        html: `
            <p>You’ve been invited to join a SplitSmart group. </p>
            <p><a href="${joinLink}">Click here to join</a></p>
        `
        });

        res.status(200).json({ message: 'Invite sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending invite', error: err.message });
    }
    };

    // Function to handle group invite
    
    export const acceptGroupInvite = async (req, res) => {
        const { token } = req.query;
    
        try {
            const decoded = jwt.verify(token, process.env.INVITE_SECRET);
            const { userId, groupId } = decoded;
    
            const group = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } }, // avoid duplicates
            { new: true }
            );
    
            res.status(200).send(`<h2>You’ve joined the group successfully 🎉</h2>`);
            console.log(`📩 [DEV LOG] User ${email} joined group ${groupId}`);
        } catch (err) {
            res.status(400).json({ message: 'Invalid or expired invite token', error: err.message });
        }
        };
    
    
