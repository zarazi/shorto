const express = require('express')
const index = require('../routes/index')
const shorto = require('../routes/shorto')

const request = require('supertest')

const initApp = router => {
  const app = express()
  app.use(router())
  return app
}
describe('All endpoints', () => {
  describe('GET /', () => {
    test('should response with Shorto!', done => {
      const app = initApp(index)
      request(app)
        .get('/')
        .expect('Content-Type', /text/)
        .expect(200, 'Shorto!', done)
    })
  })

  describe('GET /shorto', () => {
    test('should return JSON', done => {
      const app = initApp(shorto)
      request(app)
        .get('/shorto')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    test('should return correct format', async () => {
      const app = initApp(shorto)
      const res = await request(app).get('/shorto')
      expect(res.body).toHaveProperty('shortUrl')
    })
  })
})
