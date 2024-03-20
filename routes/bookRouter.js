const express = require("express")
const {BookModel} = require("../model/bookModel")
const {access} = require("../middleware/accessMiddleware")
const { auth } = require("../middleware/authMiddleware")

const bookRouter = express.Router()

bookRouter.post("/",auth,access,async(req,res)=>{
    try {
        const{title,author,category,price,quantity} = req.body;
        const book = new BookModel({
            title,author,category,price,quantity
        })
        await book.save();
        res.status(201).send({"msg":"New book added Successfully"})

    } catch (error) {
        res.send({"error":error})
    }
    
    })

    //get all books

    bookRouter.get("/",async(req,res)=>{
        try {
            const books = await BookModel.find(req.query)
            res.status(200).send({"msg":"The list of all books are",books})
        } catch (error) {
            res.status(400).send({"error":error})
        }
    })

    //get by uniqueid

    bookRouter.get("/:bookId",async(req,res)=>{
        const {bookId} = req.params
    
        try {
            const book = await BookModel.findOne({_id:bookId})
            // console.log(book)
            if (!book) {
                return res.status(404).json({ msg: `Book with ID ${bookId} not found` });
            }
            res.status(200).json({ msg: `The book with ID ${bookId}`, book });
    
        } catch (error) {
            res.status(400).send({"error":error})
        }
    })

// filter by category 
bookRouter.get("/", async (req, res) => {
    const { category } = req.query;

    try {
        let query = {}; 

        if (category) {
            query.category = category.toLowerCase(); 
        }

        const books = await BookModel.find(query);

        res.status(200).send({"books":books });
    } catch (error) {
        res.status(400).send({"error":error})
    }
});

//filter by author and category

bookRouter.get("/", async (req, res) => {
    const { author, category } = req.query;

    try {
        let query = {}; 
        if (author) {
            query.author = author; 
        }
        if (category) {
            query.category = category.toLowerCase(); 
        }

        const books = await BookModel.find(query);

        res.status(200).send({"books":books });
    } catch (error) {
        res.status(400).send({"error":error})
    }
});

    //put patch

    bookRouter.patch("/:bookId",auth,access,async(req,res)=>{
        const{bookId} = req.params
        const payload = req.body
        try {
            await BookModel.findByIdAndUpdate({_id:bookId},payload)
            res.status(204).send({"msg":`the book with Id:${bookId} has been updated`})
            
        } catch (error) {
            res.send({"error":error})
            
        }
    })

    //delete

    bookRouter.delete("/:bookId",async(req,res)=>{
        const{bookId} = req.params
        const payload = req.body
        try {
            await BookModel.findByIdAndDelete({_id:bookId},payload)
            res.status(202).send({"msg":`the book with Id:${bookId} has been deleted`})
            
        } catch (error) {
            res.send({"error":error})
            
        }
    })





    module.exports={
        bookRouter
    }