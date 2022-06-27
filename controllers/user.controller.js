import User from "../models/user.model";
import Token from "../models/token.model";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";
import { getMaxListeners } from "process";
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, callBack) {
//       callBack(null, 'public')
//     },
//     filename: function (req, file, callBack) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       callBack(null, file.fieldname + '-' + Date.now() + '.jpg')
//     }
// })

//node-mailer

require('dotenv').config();

const nodemailer = require('nodemailer');
const crypto = require('crypto');

//for sms through springedge

var springedge = require('springedge');

//registration with token

export const userRegistration = asyncHandler(async (req,res) => {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const userData = {
        name: req.body.name,
        email: req.body.email,
        contact : req.body.contact,
        age: parseInt(req.body.age),
        password: hashedPassword,
        token: generateToken(User._id)
    }

    let email = req.body.email;
    const userExists = await User.findOne({ email });
 
    if(userExists){
        return res.status(400).json({
            message: "Users Exists",
            status: false
        });
    }

    User.create(userData, function(err, data){
       let storedData = data;

        if(err) {
            return res.status(400).json({
                message: "Something went wrong.",
                status: false
            });
        }

        let tokenData = {
            _userId: data._id,
            token:crypto.randomBytes(16).toString('hex')
        }
 
        Token.create(tokenData,(err,data)=>{
            let storedTokenData = data;
            if(err){
                console.log("Token not added");
            }

            let transport = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                  user: "ii4juljweimeqjcm@ethereal.email",
                  pass: "A9z36UMKR4vXfNh2aM"
                }
             });

             let mailOptions = {
                from: 'ii4juljweimeqjcm@ethereal.email', 
                to: storedData.email, 
                subject: 'Account Verification Link', 
                text: 'Hello '+ storedData.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +'\/user'+ '\/confirmation\/' + storedData.email + '\/' + storedTokenData.token + '\n\nThank You!\n'
            }

            transport.sendMail(mailOptions, function (err) {
                if (err) { 
                    console.log(err)
                    return res.status(500).send({
                        storedData: storedData.email,
                        msg:'Technical Issue!, Please click on resend for verify your Email.',
                    });  
                }
                res.status(200).json({
                    name: req.body.name,
                    email: req.body.email,
                    contact : req.body.contact,
                    age: parseInt(req.body.age),
                    password: req.body.password,
                    token: generateToken(User._id),
                    message:"User Created & Email Sent For Verification",
                    status:true
                })
                });
            });

            // var params = {
            //     'sender': 'SEDEMO',
            //     'apikey': '6ojfpx3g160a1vv2279dtl3m42x9qekd',
            //     'to': [
            //       storedData.contact  //Moblie Numbers 
            //     ],
            //     'message': 'Hello, This is a test message from spring edge',
            //     'format': 'json'
            //   };
               
            //   springedge.messages.send(params, 5000, function (err, response) {
            //     if (err) {
            //       return console.log(err);
            //     }
            //     res.send("Email & SMS Sent For Verification"); 
            //     console.log(response);
            //   });
    });
}) 


// Email Confirmation

// export const confirmEmail = (req,res)=>{

//     Token.findOne({token:req.params.token},(err,token)=>{
//         if(!token){
//             return res.send("Your verification link may have expired. Please click on resend to verify your Email.");
//         }

//         User.findOneAndUpdate({_id : token._userId, email:req.params.email},{isVerified:true},(err,data)=>{
//             res.send({
//                 "message":"Your Email Is Verified",
//                 data,
//             })
//         })
//     })
// }


export const confirmEmail = function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired 
        if (!token) {
            return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
        }
        // if token is found then check valid user 
        else {
            User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user) {
                    return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
                }
                // user is already verified
                else if (user.isVerified) {
                    return res.status(200).send('User has been already verified. Please Login');
                }
                // verify user
                else {
                    // change isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        // error occur
                        if (err) {
                            return res.status(500).send({ msg: err.message });
                        }
                        // account successfully verified
                        else {
                            return res.status(200).send('Your account has been successfully verified');
                        }
                    });
                }
            });
        }

    });
};



//Login Credentials By Email 

// export const login = async(req,res)=>{

//     try {

//         const {email, password} = req.body;

//         const checkUser = await User.findOne({email})

//         let checkPassword;
//         if(checkUser){
//             checkPassword = await bcrypt.compare(password,checkUser.password);
//         }

//         if(checkUser && checkPassword) {
//             res.status(200).json({ 
//                 name: req.body.name,
//                 email: req.body.email,
//                 contact : req.body.contact,
//                 age: parseInt(req.body.age),
//                 password: req.body.password,
//                 token: generateToken(User._id),
//                 message:"Logged in sucessfully",
//                 status:true
//             })
//         }
//         else{
//             res.status(200).json({
//                 message:"Invalid Email or Password",
//                 status:false
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(200).json({
//             message:"Invalid Email or Password",
//             status:false
//         })
//     }

//jwt auth

//Login Credentials By Email 

export const login = async(req,res)=>{

    try {

        const {email, password} = req.body;

        const checkUser = await User.findOne({email})

        if(!checkUser){
           return res.status(200).json({
               message:"Not found",
               status:false
           })
        }

        let checkPassword;
        if(checkUser){
            checkPassword = await bcrypt.compare(password,checkUser.password);
        }

    
        // if(checkUser && checkUser._id){
        //     let token = jwt.sign({ id: checkUser._id}, 'keyForEncryption');
        //     console.log(token);
        //     res.status(200).json({
        //         status:true,
        //         message:"Logged In Successfully",
        //         data: checkUser,
        //         token: token
        //     })
        // };


        if(checkUser && checkPassword) {
            let token = jwt.sign({ id: checkUser._id}, 'keyForEncryption');
            console.log(token);
            res.status(200).json({ 
                status:true,
                message:"Logged In Successfully",
                data: checkUser,
                token: token
            })
        }
        else{
            res.status(200).json({
                message:"Invalid Email or Password",
                status:false
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Server Error",
            status:false
        })
    }








    // User.findOne({email:req.body.email, password:req.body.password},(err,user)=>{
    //     if(err){
    //         return res.status(500).json({
    //             message:"Error"
    //         })
    //     }else if(!user){
    //         return res.status(500).json({
    //             message:"User not found",
    //             user
    //         })
    //     }else if(!user.isVerified){
    //         return res.status(500).json({
    //             message:"Your Email has not been verified."
    //         })
    //     }else{
    //         return res.status(200).json({
    //             message:"Login successful"
    //         })
    //     }
    // })
}


export const userList = function(req,res) {
    User.find({}, function (err, users) {
        res.send(users);
    });
}


export const updateData = function(req,res) {
    const {id} = req.params;
    User.updateOne({_id: id},{$set: {name: req.body.name ,email: req.body.email, age: req.body.age, contact: req.body.contact, password: req.body.password}},function(err,data){
        res.json(data)
    });
}

export const deleteData = function(req,res) {
    const {id} = req.params;
    User.deleteOne({_id: id},function(err,data){
        res.json(data)
    });
}


//Registration Without Token
// export const userRegistration = function(req,res) {
//     console.log(req.body);

//     if(!req.body.email) {
//         return res.status(422).json({
//             status: false,
//             message: "Email is required"
//         })
//     }

//     const userData = {
//         name: req.body.name,
//         email: req.body.email,
//         contactNo : req.body.contact,
//         age: parseInt(req.body.age),
//         password: req.body.password
//     }

//     User.create(userData, function(err, data){
//         if(err) {
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

//     let transport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: "dfitness911@gmail.com",
//           pass: "72547777"
//         }
//      });

//      const mailOptions = {
//         from: "dfitness911@gmail.com", // Sender address
//         to: req.body.email, // List of recipients
//         subject: 'Node Mailer', // Subject line
//         text: 'Hello People!, Welcome to My Project!', // Plain text body
//     };

//    transport.sendMail(mailOptions, function(err, info) {
//        if (err) {
//          console.log(err)
//        } else {
//          console.log(info);
//        }
//    });
// }
