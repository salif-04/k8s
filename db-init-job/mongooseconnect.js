import mongoose from "mongoose"
import { config } from "dotenv"

config()

const authDb = mongoose.createConnection(process.env.AUTHDBCONNECTIONURI)
const orderDb = mongoose.createConnection(process.env.ORDERDBCONNECTIONURI)

export {
    authDb,
    orderDb
}