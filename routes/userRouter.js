const express = require("express")
const {UserModel} = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


userRouter.post("/register",(req,res)=>{
    const{name,email,password,isAdmin} = req.body;
    try {
        bcrypt.hash(password,8,async(err,hash)=>{
            if(err){
                res.send({"error":err})
            }
            else{
                const user = new UserModel({
                    name,email,password:hash,isAdmin
                })
                await user.save();
                res.status(201).send({"msg":"User registered successfully"})
            }
        })
        
    } catch (error) {
        res.send({"error":error})
    }
})

//login
userRouter.post("/login",async(req,res)=>{
    const{email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token = jwt.sign({ userID: user._id }, "masai");
            
            res.status(201).send({"msg":"Login Success",token})
            }
            else{
                res.status(400).send({"msg":"User does not exist,Please register"})
            }
        })
        
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports={
    userRouter
}

