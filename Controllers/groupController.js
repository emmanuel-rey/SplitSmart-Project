import mongoose from 'mongoose';
import Group from '../Models/groupModel.js';

//--------------------
// Create a new group
//--------------------


export const addExpense = async (req, res) => {
    const { groupId } = req.params;
    const { description, amount, paidBy, splitAmong } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
        return res.status(404).json({ message: 'Group not found' });
        }

        const cleanedSplitBetween = splitAmong?.filter(id => id && id !== 'null');

        const expense = new Expense({
        group: groupId,
        description,
        amount,
        paidBy,
        splitBetween: cleanedSplitBetween,
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });

    } catch (err) {
        res.status(500).json({ message: 'Error adding expense', error: err.message });
    }
    };


