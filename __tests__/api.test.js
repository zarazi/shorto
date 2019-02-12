const express = require('express')
const api = require('../routes/api')

const request = require('supertest')
const shortid = require('shortid')

const initApp = router => {
  const app = express()
  app.use(router())
  return app
}
describe('API endpoints', () => {
  describe('GET /api/new-id', () => {
    test('should return JSON', done => {
      const app = initApp(api)
      request(app)
        .get('/api/new-id')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    test('should return correct format', async () => {
      const app = initApp(api)
      const res = await request(app).get('/api/new-id')
      expect(res.body).toHaveProperty('id')
    })

    test('should return valid shortId', async () => {
      const app = initApp(api)
      const res = await request(app).get('/api/new-id')
      const expected = shortid.isValid(res.body.id)
      expect(expected).toBe(true)
    })

    test('should call shortid.generate once', async () => {
      const spy = jest.spyOn(shortid, 'generate')
      const app = initApp(api)
      const res = await request(app).get('/api/new-id')
      expect(shortid.generate).toHaveBeenCalledTimes(1)
    })

    // TODO: adding negative tests
  })
})
