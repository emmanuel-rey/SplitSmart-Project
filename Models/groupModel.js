import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name:{ type: String, required: true },
    description:{ type: String},
    members:[
        {
            type: Schema.Types.ObjectId,
            ref:'userModel'
        }
    ],
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})