import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    },
        type: {
        type: String,
        enum: ['group_invite', 'expense_added', 'settlement_reminder', 'general'],
        default: 'general'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupModel',
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});