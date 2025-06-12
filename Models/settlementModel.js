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
  method: {
    type: String,
    enum: ['Transfer', 'Cash', 'Other'],
    default: 'Transfer',
  },
  settledAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Settlement', settlementSchema);
