const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid token");
        }
    }catch(err){
        
    }
}