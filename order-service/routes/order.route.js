import { isEqual, isNull, isUndefined } from 'underscore'
import e, { Router } from 'express'
import axios from 'axios'
import Order from '../model/order.model.js'

const router = Router()

router.get('/', async (req, res) => {
    if (isNull(req.query.userId) || isUndefined(req.query.userId)) {
        return res.status(500).json({ message: 'User Id is requried' })
    }
    try {
        const isAuthenticated = await axios.get(`${process.env.AUTH_URI}/users/isAuthenticated`, {
            params: { userId: req.query.userId }
        })

        const orders = await Order.find({ userId: req.query.userId })
        return res.status(200).json(orders)

    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'User Not Found' })
    }
})

router.post('/add', async (req, res) => {
    if ((isNull(req.body.userId) || isUndefined(req.body.userId)) ||
        (isNull(req.body.product) || isUndefined(req.body.product)) ||
        (isNull(req.body.price) || isUndefined(req.body.price)) ||
        (isNull(req.body.quantity) || isUndefined(req.body.quantity))
    ) {
        return res.status(500).json({ message: 'Invalid Reqest' })
    }

    try {
        const isAuthenticated = await axios.get(`${process.env.AUTH_URI}/users/isAuthenticated`, {
            params: { userId: req.body.userId }
        })

        const newOrder = new Order({
            userId: req.body.userId,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity,
            amount: (req.body.price * req.body.quantity)
        })

        await newOrder.save()
        return res.status(200).json(newOrder)

    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'Error Occured' })
    }
})

export default router