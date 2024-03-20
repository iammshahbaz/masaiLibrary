// const mongoose = require("mongoose")

// const orderSchema = mongoose.Schema({
//     _id: ObjectId,
//     user : { type: ObjectId, ref: 'User' },
//     books : [{ type: ObjectId, ref: 'Book' }],
//     totalAmount:{type: Number},

// },{
//     versionKey :false
// })

// const OrderModel = mongoose.model("order",orderSchema)

// module.exports={
//     OrderModel
// }
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    totalAmount: { type: Number },
}, {
    versionKey: false
});

const OrderModel = model("order", orderSchema);

module.exports = {
    OrderModel
};
