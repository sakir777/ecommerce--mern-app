import mongoose from "mongoose";
const bcrypt = require('bcryptjs')
// const { Schema } = mongoose;

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: { 
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    },
    {
        timestamps: true,
    }
);

// userSchema.pre('save', async function (next) {
//     if(!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', userSchema);
module.exports =  User;

