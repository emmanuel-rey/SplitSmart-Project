import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name:{ type: String, required: true },
    description:{ type: String},
    members:[
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

export default mongoose.model('groupModel', groupSchema);