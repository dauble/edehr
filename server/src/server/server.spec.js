import mongoose from 'mongoose'

var should = require('should')
var request = require('supertest')
import EhrApp from './app'
import Helper from '../mcr/common/test-helper'
import applicationConfiguration from '../config/config'
const configuration = applicationConfiguration('test')
const helper = new Helper()
const ehrApp = new EhrApp()

const tokenData = Helper.sampleTokenData()
const token = Helper.generateToken(tokenData)

describe('Make some server calls', function () {
  let app
  before(function (done) {
    helper.beforeTestAppAndDbDrop(ehrApp, configuration, mongoose)
      .then( () => {
        app = ehrApp.application
        done()
      })
  })
  after(function (done) {
    helper.afterTestsCloseDb(mongoose).then(() => done() )
  })


  it('send /api/assignments', function (done) {
    request(app)
      .get('/api/assignments')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err)
        should.exist(res)
        done()
      })
  })

  it('send /api/seed-data', function (done) {
    request(app)
      .get('/api/seed-data')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err)
        should.exist(res)
        // debug('results from api/seed-data', res.body)
        done()
      })
  })

})
