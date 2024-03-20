const express = require("express")
const {OrderModel} = require("../model/orderModel")
const {auth} = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");

const orderRouter = express.Router();


orderRouter.post('/',auth, async(req,res)=>{
    try {
        const {user,books,totalAmount} = req.body;
        const order = new OrderModel({
            user,books,totalAmount
        })
        await order.save();
        res.status(201).send({"msg":"order placed Successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})

//get all orders

orderRouter.get("/",access,async(req,res)=>{
    try {
        const orders = await OrderModel.find().populate('user').populate('books');

        res.status(200).send({"orders":orders});
    } catch (error) {
        res.send({'error':error})
    }
})




module.exports={
    orderRouter
}