import mongoose from 'mongoose';

const settlementSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groupModel',
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
    description: String,
    method: {
        type: String,
        enum: ['USSD', 'Transfer', 'Cash', 'Other'],
        default: 'USSD'
    },
    status: {
        type: String,
        enum: ['initiated', 'pending', 'completed', 'failed'],
        default: 'initiated'
    },
    pagaReference: String,
    paymentData: Object,
    callbackData: Object,
    amountReceived: Number,
    settledAt: Date,
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
},{ timestamps: true });

export default mongoose.model('Settlement', settlementSchema);
