import Expense from '../Models/expenseModel.js';
import User from '../Models/userModel.js';
import mongoose from 'mongoose';

// Calculate who owes whom
export const getSettlementSummary = async (req, res) => {
    const { groupId } = req.params;

    try {
        const expenses = await Expense.find({ group: groupId });

        const balanceSheet = {}; // { userId: totalBalance }

        for (const expense of expenses) {
            const splitAmount = expense.amount / expense.splitBetween.length;

            expense.splitBetween.forEach(userId => {
            if (!balanceSheet[userId]) balanceSheet[userId] = 0;
            balanceSheet[userId] -= splitAmount;
        });

        if (!balanceSheet[expense.paidBy]) balanceSheet[expense.paidBy] = 0;
        balanceSheet[expense.paidBy] += expense.amount;
    }

    // Return a simplified summary
    const users = await User.find({ _id: { $in: Object.keys(balanceSheet) } });

    const summary = users.map(user => ({
        user: { id: user._id, name: user.name, email: user.email },
        balance: balanceSheet[user._id]
    }));

    res.status(200).json(summary);

    } catch (err) {
    res.status(500).json({ message: 'Error calculating settlements', error: err.message });
    }
};

// Mark a debt as settled
export const settleUp = async (req, res) => {
    const { groupId } = req.params;
    const { fromUserId, toUserId, amount } = req.body;

    try {
        // In a real system, you’d store this in a settlement log
        // For now, just simulate
        res.status(200).json({
            message: `User ${fromUserId} settled ₦${amount} with User ${toUserId} in Group ${groupId}.`
        });

    } catch (err) {
        res.status(500).json({ message: 'Error settling payment', error: err.message });
    }
};
