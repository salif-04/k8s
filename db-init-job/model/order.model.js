import { Schema } from "mongoose";

import { orderDb } from '../mongooseconnect.js'

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

const Order = orderDb.model('order', orderSchema)

export default Order