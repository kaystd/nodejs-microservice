import { Request, Response } from 'express'
import express from  'express'
import dotenv from 'dotenv'
import { MongoClient, MongoError } from 'mongodb'
import routes from './routes/keyRoutes'

dotenv.config()
const application = express()
const port = process.env.PORT
const mongoUrl = process.env.MONGO_URL
application.use(express.json())

application.get('/', (request: Request, response: Response) => {
  response.send("Welcome to Node.js microservice!")
})

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (error: MongoError, database: MongoClient) => {
  routes(application, database.db('crypto-project'))
})

application.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
