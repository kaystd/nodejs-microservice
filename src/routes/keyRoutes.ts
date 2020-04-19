import { Application, Request, Response } from 'express'
import { Db } from 'mongodb'
import Auth from '../middleware/Auth'
import sendMail from '../utils/sendMail'

export default (app: Application, db: Db): void => {
  app.post('/key/get', (request: Request, response: Response) => {
    if (!request.body.mail) {
      response.send({ error: 'Mail is not provided' })
    } else {
      const id = { name: 'RSA-public' }
      db.collection('keys').findOne(id, (err, result) => {
        if (err) {
          response.send({ error: err.message })
        } else {
          sendMail(request.body.mail, result.key).then(res => response.send(res))
        }
      })
    }
  })
  app.post('/key/send', Auth.verifyToken, (request: Request, response: Response) => {
    if (!request.body.key) {
      response.send({ error: 'Key is not provided' })
    } else {
      const id = { name: 'RSA-public' }
      const key = { $set: { name: 'RSA-public', key: request.body.key } }
      const upsert = { upsert: true }
      db.collection('keys').updateOne(id, key, upsert, (err, result) => {
        if (err) {
          response.send({ error: err.message })
        } else {
          response.send({ successModified: result.upsertedCount + result.modifiedCount })
        }
      })
    }
  })
}
