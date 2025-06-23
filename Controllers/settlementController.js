import Expense from '../Models/expenseModel.js';
import User from '../Models/userModel.js';
import groupModel from '../Models/groupModel.js';
// import mongoose from 'mongoose';
import Settlement from '../Models/settlementModel.js';
import { requestUssdPayment } from '../Services/PagaService.js';

// Calculate who owes whom
export const getSettlementSummary = async (req, res) => {
    const { groupId } = req.params;

    try {
        const expenses = await Expense.find({ group: groupId });

        const balanceSheet = {}; // { userId: totalBalance }

        for (const expense of expenses) {
            // const splitAmount = expense.amount / expense.splitBetween.length;

            expense.splitBetween.forEach(entry => {
                const userId = entry.user;
                const owed = entry.amountOwed;
            if (!balanceSheet[userId]) balanceSheet[userId] = 0;
            balanceSheet[userId] -= owed;
        });

        if (!balanceSheet[expense.paidBy]) balanceSheet[expense.paidBy] = 0;
        balanceSheet[expense.paidBy] += expense.amount;
    }

    // Return a simplified summary
    const users = await User.find({ _id: { $in: Object.keys(balanceSheet) } });

    const summary = users.map(user => ({
        user: { id: user._id, name: user.username, email: user.email },
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
    const { fromUserId, toUserId, amount, description } = req.body;

    try {

        // Get payer and payee details
        const [group, payer, payee] = await Promise.all([
            groupModel.findById(groupId),
            User.findById(fromUserId),
            User.findById(toUserId)
        ]);

        if (!group) return res.status(404).json({ message: 'Group not found' });
        if (!payer || !payee) return res.status(404).json({ message: 'User not found' });
        if (!payer.canMakePayment()) {
            return res.status(400).json({ message: 'Payer cannot make payments (missing phone or inactive)' });
        }

        // Generate unique reference
        const referenceNumber = `SPLIT_${Date.now()}`;
        const callbackUrl = `${process.env.BASE_URL}/api/settlements/callback`;

        // Initiate USSD payment
        const paymentResult = await requestUssdPayment({
            referenceNumber,
            amount,
            payer: {
                name: payer.username,
                phoneNumber: payer.phoneNumber
            },
            payee: {
                name: payee.username
            },
            callbackUrl
        });

        if (!paymentResult.success) {
            return res.status(400).json({
                message: paymentResult.error,
                details: paymentResult.details
            });
        }

        const newSettlement = new Settlement({
            group:groupId,
            from:fromUserId,
            to:toUserId,
            amount,
            description: description || 'Group settlement',
            pagaReference: referenceNumber,
            method: 'USSD',
            status: 'initiated',
            paymentData: paymentResult.data
        });

        await newSettlement.save();
        // In a real system, you’d store this in a settlement log
        // For now, just simulate
        res.status(200).json({
            // message: "Debt settled",
            // newSettlement,
            message: 'USSD payment initiated',
            newSettlement,
            ussdInstructions: paymentResult.data.paymentInstructions
        });
        await Settlement.findByIdAndUpdate(newSettlement._id, { paymentStatus: 'paid' });

    } catch (err) {
        res.status(500).json({ message: 'Error settling payment', error: err.message });
    }
};

export const handlePagaCallback = async (req, res) => {
    const { externalReferenceNumber, statusCode, state, paymentAmount } = req.body;

    try {
        // Verify hash in production here
        
        // Update settlement status
        const settlement = await Settlement.findOneAndUpdate(
            { pagaReference: externalReferenceNumber },
            { 
                status: state.toLowerCase(),
                amountReceived: paymentAmount,
                settledAt: new Date(),
                callbackData: req.body
            },
            { new: true }
        );

        if (!settlement) {
            return res.status(404).json({ message: 'Settlement not found' });
        }

        res.status(200).json({ message: 'Callback received' });
    } catch (error) {
        console.error('Callback error:', error);
        res.status(500).json({ message: 'Failed to process callback' });
    }
};
