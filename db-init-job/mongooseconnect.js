import mongoose from "mongoose"
import { config } from "dotenv"

config()

const authDb = mongoose.createConnection(process.env.AUTHDBCONNECTIONURI, { dbName: 'authDb' })
const orderDb = mongoose.createConnection(process.env.ORDERDBCONNECTIONURI, { dbName: 'orderDb' })

export {
    authDb,
    orderDb
}