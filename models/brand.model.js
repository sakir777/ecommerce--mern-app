import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String
    },
    categoryId: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        // default:[]
    }]
})

const Brand = mongoose.model('Brand', schema);
export default Brand;