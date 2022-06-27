import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type:String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    // brandId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Brand'
    // }
});

const Product = mongoose.model('Product', schema);
export default Product;