import Product from "../models/product.model";
import mongoose from "mongoose";
import multer from "multer";

const storage = multer.diskStorage({
    destination:(req, file, callback)=> {
      callback(null, 'public')
    },
    filename:(req, file, callback)=> {
      callback(null, file.originalname + '-' + Date.now()+".jpg")
    }
  })

export const productUpload = async(req, res)=>{
    const uploadImages = multer({ storage: storage }).single('image');
    uploadImages(req, res, async function (err) {
        console.log(req.file);
    })
    res.status(200).json({
        status:true,
    })
}

// export const productList = function(req,res) {

//     const uploadImages = multer({ storage: storage}).single('image');
//     uploadImages(req, res, async function (err) {
//         console.log(req.file, req.body, req.user);
//     })

//     const productData = {
//         name: req.body.name,
//         size: req.body.size,
//         color: req.body.color,
//         price: req.body.price,
//         brand: req.body.brand,
//         image: req.file,
//         categoryId: req.body.categoryId,
//         subcategoryId: req.body.subcategoryId,
//         brandId: req.body.brandId,
//     }

//     Product.create(productData, function(err, data){
//         if(err) {
//             console.log(err) 
//             return res.status(500).json({
//                 message: "Something went wrong.",
//                 status: false
//             });
//         }
//         return res.status(200).json({
//             message: "Success",
//             data:data,
//             status:true
//         });
//     });
// }

export const productList = function(req,res) {
    const uploadImages = multer({ storage: storage }).single('image');

    uploadImages(req, res, async function (err) {
        console.log(req.file);

    const productData = {
        name: req.body.name,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        brand: req.body.brand,
        image: 'http://localhost:8000/'+ req.file.path,
        categoryId: req.body.categoryId,
        subcategoryId: req.body.subcategoryId,
    }

    Product.create(productData, function(err, data){
        if(err) {
            console.log(err) 
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
});
}


export const findpro = async function (req, res) {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
  
    const userInfo = await Product.find({ subcategoryId: ObjectId(req.params.subcategoryId)});
  
    // console.log(userInfo);
    res.status(200).json({
        message:"Data fetched successfully",
        data:userInfo,
        status:true,
    })
  } catch (error) {
      res.status(400).json({
          status:false,
          message:"Bad Request"
      })
  }
};


export const searchProduct = (req,res) =>{
    const search = req.body.name;
    const regex = new RegExp(search,'i');
    Product.find({name:{$regex:regex}},(err,data)=>{
        res.send(err?{status:false, message:"Error"}:{status:true, message:"Success",data})
    })
}

export const showAllPro = async function (req, res) {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;

    const userInfo = await Product.find({}).populate('subcategoryId').populate('categoryId');

    // console.log(userInfo);
    res.status(200).json({
        message:"Data fetched successfully",
        data:userInfo,
        status:true,
    })
};

export const findbrand = async function (req, res) {
    const { brand } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    console.log(brand);
    const userInfo = await Product.find({ brand: brand}).populate('brand');
  
    console.log(userInfo);
    res.send(userInfo)

    // Product.find({brand:brand},(err,data)=>{
    //     res.send(data);
    // })
};

export const proByPrice = async function (req,res) {
    Product.find({price: { $gt:req.body.min, $lt:req.body.max}},(err,data)=>{
        if(err){
            return res.status(500).json({
                status:false,
                message:"Error"
            })
        }

        return res.status(200).json({
            status:true,
            message:"Success",
            data
        })
    })
}

export const proUpdate = function (req, res) {
    Product.updateOne({_id: req.params.id}, 
        {$set: {name: req.body.name, size: req.body.size, color: req.body.color, price: req.body.price, image: req.body.image, categoryId: req.body.categoryId, subcategoryId: req.body.subcategoryId}},
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


export const proDelete = function (req, res) {
    Product.deleteOne({_id: req.params.id},
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

/////add brand Id

export const updateBrand = function (req, res) {
    const { brand } = req.params;
    Product.updateMany({ brand: brand },
        { brandId: req.body.brandId },
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