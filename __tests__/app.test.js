const express = require('express')
const index = require('../routes/index')

const request = require('supertest')

const initApp = () => {
  const app = express();
  app.use(index());
  return app;
}

describe('GET /', function() {
  test('should response with Shorto!', done => {
    const app = initApp()
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, 'Shorto!', done)
  })
})
