import Brand from "../models/brand.model";
import Product from "../models/product.model";

import mongoose from "mongoose";

export const addBrand = function(req,res){
    const brandData = {
        name: req.body.name,
        categoryId: req.body.categoryId
    }

    Brand.find (brandData,function(err,data){
        if(data.length){
            return res.status(500).json({
            message:"Data Exits",
            status: false
            })
        }
        else{
            Brand.create(brandData, function(err,data){
            if(err){
                return res.status(500).json({
                    message: "Something went wrong.",
                    status: false
                })
            }
            return res.status(200).json({
                message: "Success",
                data:data,
                status:true
            });
            });
        };
        });
};


export const findbrand = async function (req, res) {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
  
    const userInfo = await Brand.find({ _id: id});
  
    console.log(userInfo);
    res.send(userInfo)
};


export const showbrand = async function (req, res) {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
  
    const userInfo = await Brand.find({}).populate('categoryId');
  
    console.log(userInfo);
    res.send(userInfo)
};


export const brandUpdate = function (req, res) {
    const { id } = req.params;

    Brand.updateOne({_id: id}, 
        {$set: {name: req.body.name, categoryId: req.body.categoryId}},
        function(err,data){
            console.log("Brand Name Updated")  
            res.send("Brand Name Updated")  
        });

    Product.updateMany({brandId: id},{brand: req.body.name},function(err,data){
        console.log("Product Brand Name Updated")
        res.send("Product Brand Name Updated")
    })
};


export const brandDelete = function (req, res) {
    Brand.deleteOne({_id: req.params.id},
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