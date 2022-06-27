import mongoose from "mongoose";
const bcrypt = require('bcryptjs')
// const { Schema } = mongoose;

const adminSchema = mongoose.Schema ({
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
        default: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true
    },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports =  Admin;