import mongoose from 'mongoose';

const settlementSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  fromUser: {
    type: String,
    ref: 'User',
    required: true,
  },
  toUser: {
    type: String,
    ref: 'User',
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  totalOwed: {
    type: Number,
    required: true,
  },
  remainingAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['partial', 'paid'],
    default: 'partial',
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Settlement', settlementSchema);
