import  { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

const Auth = {
  verifyToken: (request: Request, response: Response, next: NextFunction): Response | void => {
    const token = request.headers['authorization']
    if (!token) {
      return response.status(400).send({ message: 'Token is not provided' })
    }
    try {
      const secret = process.env.SECRET
      const decoded = jwt.verify(token, secret) as { login: string }
      if (decoded.login !== 'Admin') {
        return response.status(400).send({ message: 'Token is invalid' })
      }
      next()
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}

export default Auth
