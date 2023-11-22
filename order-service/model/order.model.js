import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        requried: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Invalid Price']
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Invalid Quantity']
    },
    amount: {
        type: Number,
        required: true
    }
})

const Order = model('order', orderSchema)

export default Order