import express from "express";
import jwt from "jsonwebtoken";
import { userRegistration, userList, updateData, deleteData, confirmEmail, login} from "../controllers/user.controller";

// const validation = require("../middlewares/validationMiddleware");
// const userSchema = require("../models/userValidation");

const router = express.Router();

router.post('/user-register/', userRegistration);

router.get('/confirmation/:email/:token', confirmEmail);

router.post('/user-login/', login);

router.get('/user-list/', userList)

router.post('/user-update/:id', updateData)

router.post('/user-delete/:id', deleteData)

export default router;

function isAuthorized(req, res, next) {
    console.log(req.headers)
    if(req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(" ");
        if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];
            var token = credentials
           
            var decoded = jwt.verify(token, 'keyForEncryption');
            console.log(decoded, 'decoded');
            if(decoded && decoded.id) {
                req.user = decoded;
                next()
            } else {
                return res.json(401, { err: "Invalid token" });
            }
        } else {
            return res.json(401, { err: "Format is Authorization: Bearer [token]" });
        }
    }else {
        return res.status(401).json({
            status: false,
            message: 'Authorization token is required'
        })
    }
}
 