const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    // _id: ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true},
    category: { type: String, required: true },
    price:{type:Number,required: true},
    quantity:{type:Number,required: true},

},{
    versionKey :false
})

const BookModel = mongoose.model("book",bookSchema)

module.exports={
    BookModel
}

