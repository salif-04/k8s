import dotenv from 'dotenv'
import app from './app.js'
import { connect } from 'mongoose'

dotenv.config()

const port = process.env.PORT

try {
  await connect(process.env.MONGOCONNECTIONURI, {
    dbName: 'orderDb'
  })
  app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
  })
} catch (error) {
  console.log(`Tring on PORT: ${port}`)
  console.log(`MongoDb Uri: ${process.env.MONGOCONNECTIONURI}`)
  console.log('Error occured while spinnig up the server...')
  console.log(error)
}