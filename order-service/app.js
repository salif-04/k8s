import express from 'express';

import orderRouter from './routes/order.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/orders', orderRouter)

export default app