import { Request, Response } from 'express'
import express from 'express'

const application = express()
const port = 8080

application.get('/', (request: Request, response: Response) => {
  response.send("Welcome to Node.js microservice!")
})

application.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

