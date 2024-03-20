
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
