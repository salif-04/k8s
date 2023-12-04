import { createReadStream } from 'fs'
import { parse } from 'csv-parse'
import User from "./model/user.model.js"
import Order from "./model/order.model.js"

const createUsers = async () => {
    try {
        const userToInsert = []
        createReadStream('./users.csv')
            .pipe(parse())
            .on('data', (row) => {
                userToInsert.push({ username: row[0], password: row[1] })
            }).on("finish", async () => {
                console.log(`Finished Reading Users CSV`)

                const createdUsers = await User.insertMany(userToInsert)
                console.log(`Created Users:`)
                console.log(createdUsers)

                createProducts(createdUsers)
            })
    } catch (error) {
        throw new Error(`Error Occured`)
    }
}

const createProducts = async (createdUsers) => {
    try {
        const ordersToInsert = []
        createReadStream('./orders.csv')
            .pipe(parse())
            .on('data', (row) => {
                const user = createdUsers.filter((u) => u.username === row[0])
                ordersToInsert.push({ userId: user[0]._id, productId: row[1], price: row[2], quantity: row[3], amount: row[4] })
            }).on("finish", async () => {
                console.log(`Finished Reading Orders CSV`)

                console.log(ordersToInsert)

                const createdOrders = await Order.insertMany(ordersToInsert)
                console.log(`Created Orders:`)
                console.log(createdOrders)
                process.exit(0)
            })
    } catch (error) {
        console.log(error)
        throw new Error(`Error Occured`)
    }
}

console.log(`Starting migration...`)
await createUsers()
console.log(`Migration completed...`)