import { Application, Request, Response } from 'express'
import { Db } from 'mongodb'
import Auth from '../middleware/Auth'

export default (app: Application, db: Db): void => {
  app.post('/key', Auth.verifyToken, (request: Request, response: Response) => {
    if (!request.body.key) {
      response.send({ error: 'Key is not provided' })
    }
    const id = { name: 'RSA-public' }
    const key = { $set: { name: 'RSA-public', key: request.body.key } }
    const upsert = { upsert: true }
    db.collection('keys').updateOne(id, key, upsert, (err, result) => {
      if (err) {
        response.send({ error: err.message })
      } else {
        response.send({ successModified: result.upsertedCount })
      }
    })
  })
}
