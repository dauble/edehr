import express from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { CaptureConsole as CaptureConsoleIntegration } from '@sentry/integrations'
import bodyParser from 'body-parser'
import db from './db'
import { apiMiddle, apiError } from './api.js'
import { Text } from '../config/text'
import { sentryDebugLimiter } from '../helpers/middleware'
import { logError } from '../helpers/log-error'
const debug = require('debug')('server')
const helmet = require('helmet')

function sentryEnvironment (config) {
  let url = config.domain
  if (url.includes('localhost')) {
    url = 'localhost'
  } else {
    url = url.replace(/https+:\/\//,'').replace(/\./g,'_')
  }
  return url
}

export default class EhrApp {
  constructor (config) {
    const app = this.app = express()
    if (config.sentryDsn) {
      const sentryEnv = sentryEnvironment (config)
      debug('Sentry set environment to ', sentryEnv)
      Sentry.init({
        dsn: config.sentryDsn,
        environment: sentryEnv,
        integrations: [
          // enable HTTP calls tracing
          new Sentry.Integrations.Http({ tracing: true }),
          // enable Express.js middleware tracing
          new Tracing.Integrations.Express({ app }),
          new CaptureConsoleIntegration({ levels: ['error', 'assert'] })
        ],
        release: 'server-edehr@' + process.env.npm_package_version,
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: config.sentryTraceRate,
      })
    }
  }

  setup (config) {
    let app = this.app
    if (config.sentryDsn) {
      // RequestHandler creates a separate execution context using domains, so that every
      // transaction/span/breadcrumb is attached to its own Hub instance
      app.use(Sentry.Handlers.requestHandler())
      // TracingHandler creates a trace for every incoming request
      app.use(Sentry.Handlers.tracingHandler())
    }
    app.use(helmet())
    // For error reporting will use pug (formerly jade) file formats. See views/server-errors
    app.set('view engine', 'pug')
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    return db(config)
      .then(connection => {
        app.connection = connection
        return apiMiddle(app, config)
      })
      .then(api => {
        debug('api middle is set up next set up the final routing')
        app.use('/', api)
        if (config.sentryDsn) {
          app.get('/api/debug-sentry/:type', sentryDebugLimiter, (req, res) => {
            const { type } = req.params
            console.log('Sentry debug api end point has type', type, req.params)
            if (type === 'console') {
              const msg = 'Sentry api end point that uses console.error'
              console.error(msg)
              let status = 200
              let json = { message: msg, status: status }
              res.status(status).json(json)
            } else if (type === 'log') {
              const msg = 'Sentry api end point that uses logError'
              logError(msg)
              let status = 200
              let json = { message: msg, status: status }
              res.status(status).json(json)
            } else {
              throw new Error('Throw an error to test sentry')
            }
          })
        }
        return EhrApp._setupFinalMiddle(app, config)
      })
      .then(api => {
        debug('EhrApp setup complete')
      })
  }

  get application () {
    return this.app
  }

  static _setupFinalMiddle (app, config) {
    // The Sentry error handler must be before any other error middleware and after all controllers
    if (config.sentryDsn) {
      app.use(Sentry.Handlers.errorHandler())
    }

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      EhrApp._fourOhFour(req, res)
    })
    apiError(app, config)
  }

  static _fourOhFour (req, res) {
    let { url } = req
    let status = 404
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    var env = process.env.NODE_ENV
    if (url.includes('favicon')) {
      debug('Another request for the favicon')
      res.status(status).send(Text.NO_FAVICON)
    } else {
      var msg = 'Could not find "' + fullUrl + '". Environment: ' + env
      debug(msg)
      res.status(status)
      res.json({message: msg, status: status})
    }
  }
}
