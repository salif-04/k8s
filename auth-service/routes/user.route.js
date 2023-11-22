import { isEqual, isNull, isString, isUndefined } from 'underscore'
import { Router } from 'express'
import User from '../model/user.model.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const users = await (await User.find()).map(user => { return { id: user._id, username: user.username } })
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error Occured while fetching users' })
    }
})

router.get('/isAuthenticated', async (req, res) => {
    if (isNull(req.query.userId) || isUndefined(req.query.userId) || !isString(req.query.userId)) {
        console.log('User Id is missing')
        return res.status(500).json({ message: 'User Id is requried' })
    }

    try {

        const doesUserExist = await User.findById(req.query.userId)

        if (doesUserExist) {
            console.log(`Authenticated: ${req.query.userId}`)
            return res.status(200).json({ message: 'Authenticated' })
        } else {
            console.log(`Invalid User Id: ${req.query.userId}`)
            return res.status(500).json({ message: 'User Id Not Found' })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error Occured while fetching users' })
    }
})

router.post('/add', async (req, res) => {
    if (isNull(req.body.username) || isUndefined(req.body.username) || isNull(req.body.password) || isUndefined(req.body.password)) {
        res.status(500).json({ name: 'invalid username or password' })
        return
    }

    const doesUserExist = await User.findOne({ username: req.body.username })
    if (doesUserExist) {
        console.log(doesUserExist)
        res.status(500).json({ message: 'User already exists' })
        return
    } else {
        console.log(doesUserExist)
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })

    try {
        await newUser.save()
        res.status(200).json({ username: newUser.username })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error Occured while creating user' })
    }
})

export default router