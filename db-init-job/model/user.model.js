import mongoose, { Schema, model } from 'mongoose'

import { authDb } from '../mongooseconnect.js'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: [3, 'Username Too Small'],
        max: [24, 'Username Too Large']
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password Too Small'],
        max: [64, 'Password Too Large']
    }
})

const User = authDb.model('user', userSchema)

export default User