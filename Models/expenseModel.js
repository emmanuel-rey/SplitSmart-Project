import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paidBy: {
        type: String,
        ref: 'User',
        required: true,
    },
    splitBetween: [
        {
        user: { type: String, ref: 'User' },
        amountOwed: { type: Number },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

export default mongoose.model('Expense', expenseSchema);
