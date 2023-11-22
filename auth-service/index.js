import dotenv from 'dotenv'
import { connect } from 'mongoose'
import app from './app.js'

dotenv.config()

const port = process.env.PORT

try {
  await connect(process.env.MONGOCONNECTIONURI, {
    dbName: 'authDb'
  })
  console.log('Successfully connected to database...')
  app.listen(port, function () {
    console.log('Listening on port 3000...');
  })
} catch (error) {
  console.log(`Tring on PORT: ${port}`)
  console.log(`MongoDb Uri: ${process.env.MONGOCONNECTIONURI}`)
  console.log('Error occured while connecting to db...')
}