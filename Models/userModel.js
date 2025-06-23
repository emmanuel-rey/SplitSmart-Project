import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    //for ussd ( the Phone number field)
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v){
                //Simple NGN numbervalidation
                return /^[0][7-9][0-1][0-9]{8}$/.test(v);
            },
            message:'Please enter a valid Nigerian phone number (e.g., 08012345678)'
        }
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

// Hash the password before saving the user document
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare plain password with hashed
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.canMakePayment = function(){
    return this.phoneNumber && this.isActive;
};

const User = mongoose.model('User', UserSchema);
export default User;
