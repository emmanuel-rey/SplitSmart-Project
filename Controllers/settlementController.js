import Expense from '../Models/expenseModel.js';
import Settlement from '../Models/settlementModel.js';


export const settleUp = async (req, res) => {
    const { groupId } = req.params;
    const { fromEmail, toEmail, amount, totalOwed } = req.body;

    if (!fromEmail || !toEmail || !amount || isNaN(amount)) {
        return res.status(400).json({ message: 'fromEmail, toEmail, numeric amount, and totalOwed are required.' });
    }

    try {
        const amountNum = parseFloat(amount);
        const totalOwedNum = parseFloat(totalOwed);

        // Check if there's a previous settlement between these users in this group
        let existing = await Settlement.findOne({ group: groupId, fromUser: fromEmail, toUser: toEmail });

        if (existing) {
        existing.amountPaid += amountNum;
        existing.remainingAmount = Math.max(totalOwedNum - existing.amountPaid, 0);
        existing.status = existing.remainingAmount === 0 ? 'paid' : 'partial';
        await existing.save();

        } else {
        const remaining = Math.max(totalOwedNum - amountNum, 0);
        const status = remaining === 0 ? 'paid' : 'partial';

        existing = new Settlement({
            group: groupId,
            fromUser: fromEmail,
            toUser: toEmail,
            totalOwed: totalOwedNum,
            amountPaid: amountNum,
            remainingAmount: remaining,
            status,
        });

        await existing.save();
        }

        res.status(200).json({
        message: `${fromEmail} has paid ₦${amountNum} to ${toEmail} in Group ${groupId}.`,
        settlement: existing,
        });

    } catch (err) {
        console.error('Settlement error:', err);
        res.status(500).json({ message: 'Error settling payment', error: err.message });
    }
    };

    // Suggest who owes who how much based on all expenses
    export const calculateDetailedSettlement = async (req, res) => {
    const { groupId } = req.params;

    try {
        const expenses = await Expense.find({ group: groupId });

        const balances = {}; // { email: netBalance }

        for (const expense of expenses) {
        const amountPerUser = expense.amount / expense.splitBetween.length;

        for (const entry of expense.splitBetween) {
            const email = entry.user; // Extract actual email from object
            if (!balances[email]) balances[email] = 0;
            balances[email] -= amountPerUser;
}

        const payerEmail = expense.paidBy;
        if (!balances[payerEmail]) balances[payerEmail] = 0;
        balances[payerEmail] += expense.amount;
        }

        const creditors = [], debtors = [];

        for (const [email, balance] of Object.entries(balances)) {
        if (balance > 0) {
            creditors.push({ email, amount: balance });
        } else if (balance < 0) {
            debtors.push({ email, amount: -balance });
        }
        }

        const settlements = [];

        for (const debtor of debtors) {
            let amountToSettle = debtor.amount;

            for (const creditor of creditors) {
                if (amountToSettle === 0) break;
                if (creditor.amount === 0) continue;

                const settledAmount = Math.min(amountToSettle, creditor.amount);

                if (debtor.email !== creditor.email) {
                settlements.push({
                    message: `${debtor.email} owes ${creditor.email} ₦${parseFloat(settledAmount.toFixed(2))}`,
                    from: debtor.email,
                    to: creditor.email,
                    amount: parseFloat(settledAmount.toFixed(2)),
                });

                }

                creditor.amount -= settledAmount;
                amountToSettle -= settledAmount;
            }
            }


        res.status(200).json(settlements);
    } catch (err) {
        res.status(500).json({ message: 'Error calculating detailed settlements', error: err.message });
    }
    };

    // Fetch all stored settlement transactions in a group
    export const getGroupSettlements = async (req, res) => {
    const { groupId } = req.params;

    try {
        const settlements = await Settlement.find({ group: groupId });
        res.status(200).json(settlements);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching settlements', error: err.message });
    }
    };
