import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupModel',
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    splitBetween: [
        {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amountOwed: { type: Number },
        settled: { type: Boolean, default: false }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

export default mongoose.model('Expense', expenseSchema);
