import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name:{ type: String, required: true },
    description:{ type: String},
    members:[
        {
            type: String,
            required: true,
            ref:'User'
        }
    ],
    createdBy:{
        type: String,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

export default mongoose.model('Group', groupSchema);
