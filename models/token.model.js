import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {expires: 86400000}
    } 
});

const Token = mongoose.model('Token',schema);
export default Token;
