import Admin from "../models/admin.model";
import Token from "../models/token.model";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";
import { getMaxListeners } from "process";
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
import multer from 'multer';



//node-mailer

require('dotenv').config();

const nodemailer = require('nodemailer');
const crypto = require('crypto');

//for sms through springedge

var springedge = require('springedge');

//registration with token

export const adminRegistration = asyncHandler(async (req,res) => {
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const adminData = {
        name: req.body.name,
        email: req.body.email,
        contact : req.body.contact,
        age: parseInt(req.body.age),
        password: hashedPassword,
        token: generateToken(Admin._id)
    }

    let email = req.body.email;
    const userExists = await Admin.findOne({ email });
 
    if(userExists){
        return res.status(400).json({
            message: "Users Exists",
            status: false
        });
    }

    Admin.create(adminData, function(err, data){
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
                    token: generateToken(Admin._id),
                    message:"Admin Created & Email Sent For Verification",
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


export const login = async(req,res)=>{

    try {

        const {email, password} = req.body;

        const checkUser = await Admin.findOne({email})

        // if(!checkUser){
        //     res.status(422).json({
        //         status:false,
        //         message:"Invalid Credentials"
        //     })
        // }

        let checkPassword;
        if(checkUser){
            checkPassword = await bcrypt.compare(password,checkUser.password);
        }


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
        res.status(200).json({
            message:"Invalid Email or Password",
            status:false
        })
    }
}