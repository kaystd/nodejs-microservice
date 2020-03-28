const express = require('express')
const application = express()
const port = 8080

application.get('/', (request, response) => {
  response.send("Welcome to Node.js microservice!")
})

application.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

