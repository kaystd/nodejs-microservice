import { Request, Response } from 'express'
import express from  'express'
import Auth from './middleware/Auth'
import * as dotenv from 'dotenv'

dotenv.config()
const application = express()
const port = process.env.PORT

application.get('/', Auth.verifyToken, (request: Request, response: Response) => {
  response.send("Welcome to Node.js microservice!")
})

application.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
