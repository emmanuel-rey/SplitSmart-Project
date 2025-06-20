import Expense from '../Models/expenseModel.js';
import Group from '../Models/groupModel.js';

// Add new expense
export const addExpense = async (req, res) => {
    const { groupId } = req.params;
    const { description, amount, paidBy, splitAmong } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
        return res.status(404).json({ message: 'Group not found' });
        }

        const validSplitUsers = splitAmong?.filter(id => id && id !== 'null');
        const splitCount = validSplitUsers.length;

        if (splitCount === 0) {
        return res.status(400).json({ message: 'At least one user must be included in splitAmong.' });
        }

        const amountPerUser = amount / splitCount;

        const splitBetween = validSplitUsers.map(userId => ({
        user: new mongoose.Types.ObjectId(userId),
        amountOwed: amountPerUser,
        }));

        const expense = new Expense({
        group: groupId,
        description,
        amount,
        paidBy: new mongoose.Types.ObjectId(paidBy),
        splitBetween,
        });

        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });

    } catch (err) {
        res.status(500).json({ message: 'Error adding expense', error: err.message });
    }
    };

// Get all expenses for a group
export const getExpensesByGroup = async (req, res) => {
    const { groupId } = req.params;

        try {
        const expenses = await Expense.find({ group: groupId })
            .populate('paidBy', 'name email')
            .populate('splitBetween', 'name email');

        res.status(200).json(expenses);

        } catch (err) {
        res.status(500).json({ message: 'Error fetching expenses', error: err.message });
        }
};
