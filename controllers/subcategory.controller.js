import Subcategory from "../models/subcategory.model";
import Product from "../models/product.model";
import mongoose from "mongoose";
import Category from "../models/category.model";

export const subCategoriesList = function(req,res) {
    const subCategoryData = {
        name: req.body.name,
        categoryId: req.body.categoryId
    }
    
    Subcategory.create(subCategoryData, function(err, data){
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


export const findsub = async function (req, res) {
    // const { categoryId } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
   
    const userInfo = await Subcategory.find({ categoryId: ObjectId(req.params.categoryId)});
  
    console.log(userInfo);
    res.status(200).json({
        message:"Data fetched successfully",
        data:userInfo,
        status:true,
    })
};


export const showsub = async function (req, res) {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
  
    const userInfo = await Subcategory.find({}).populate('categoryId');

    res.status(200).json({
        message:"Data fetched successfully",
        data:userInfo,
        status:true,
    })
};


export const subUpdate = function (req, res) {
    Subcategory.updateOne({_id: req.params.id}, 
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



export const subDelete = function (req, res) {
    Subcategory.deleteOne({_id: req.params.id},
        (err,data)=>{
            console.log("SubCategory Deleted")
        });
    
        Product.deleteMany({subcategoryId: req.params.id},
        (err,data)=>{
            console.log("Product Deleted")
        });

        res.send("Done Successfully")
};



