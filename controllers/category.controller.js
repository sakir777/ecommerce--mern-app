import Category from "../models/category.model";
import Subcategory from "../models/subcategory.model";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const categoriesList = async function(req,res) {
    const categoryData = {
        name: req.body.name,
    }

    let name = req.body.name;
    const categoryExists = await Category.findOne({ name });
 
    if(categoryExists){
        return res.status(400).json({
            message: "Category Exists",
            status: false
        });
    }
    
    Category.create(categoryData, function(err, data){
        if(err) {
            return res.status(500).json({
                message: "Something went wrong.",
                status: false
            });
        }
        return res.status(200).json({
            message: "Success",
            data:data,
            status:true
        });
    });
}


export const findcat = async function (req, res) {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
  
    const userInfo = await Category.find({ _id: ObjectId(id)}).populate('_id');
  
    console.log(userInfo);
};

export const showcat = async function (req, res) {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
  
    const userInfo = await Category.find({}).populate('_id');
  
    res.status(200).json({
        message:"Data fetched successfully",
        data:userInfo,
        status:true,
    })
};



export const catUpdate = function (req, res) {
    Category.updateOne({_id: req.params.id}, 
        {$set: {name: req.body.name}},
        function(err,data){
            if(err) {
                return res.status(500).json({
                    message: "Something went wrong.",
                    status: false
                });
            }
            return res.status(200).json({
                message: "Success",
                data:data,
                status:true
            });
        });
};


export const catDelete = function (req, res) {
    Category.deleteOne({_id: req.params.id},
    (err,data)=>{
        console.log("Category Deleted")
    });

    Subcategory.deleteMany({categoryId: req.params.id},
    (err,data)=>{
        console.log("Sub Category Deleted")
    });

    Product.deleteMany({categoryId: req.params.id},
    (err,data)=>{
        console.log("Product Deleted")
    });
            res.send("Done Successfully")
};  
