'use strict'
import { Text } from './text'
import moment from 'moment'

import { version } from 'process'


const debug = require('debug')('server')
const details = require('debug')('details')
const logError = require('debug')('error')

debug(`Node Version: ${version}`)
// get the application root package file reaching up outside of the server sub-project
const appVersion = require('../../../package.json').version
debug('Config setup found app version:', appVersion)

const DEFAULT_COOKIE_SECRET = 'this is the secret for the session cookie'

// console.log('config.js process.env', process.env)

///////////////// DEFAULT CONFIG
function defaultConfig (env) {
  return {
    adminPassword: process.env.ADMIN_PWORD,
    appVersion: appVersion,
    apiToken: process.env.API_TOKEN,
    appTitle: process.env.APP_TITLE || 'Dev-Edehr',
    isDevelop: true,
    isProduction: false,
    env: env,
    traceApiCalls: true,
    scheme: process.env.SCHEME || 'http',
    apiHost: process.env.DOMAIN || 'localhost',
    apiPort: process.env.API_PORT || 27000,
    apiUrl: '',
    clientPort: process.env.CLIENT_PORT || 28000,
    clientHost: process.env.DOMAIN || 'localhost',
    clientUrl: '',
    domain: process.env.DOMAIN || 'localhost',
    serverPort: process.env.SERVER_PORT || 27000,
    authTokenSecret: process.env.AUTH_TOKEN_SECRET || 'defaultTokenSecretForJWT',
    cookieSecret: process.env.COOKIE_SECRET || DEFAULT_COOKIE_SECRET,
    cookieSettings: cookieSettings(),
    ehrFilesDirectory: process.env.EHR_FILES_DIRECTORY || 'files-ehr',
    ehrCommonFilesDirectory: process.env.EHR_COMMON_FILES_DIRECTORY || 'files-common',
    ehrMaxFileSize: process.env.EHR_MAX_FILE_SIZE || 1024 * 1024 * 5,
    ehrFileTypeRE: /jpeg|jpg|png|gif|tiff|tif|bmp|pdf|json|txt|text/,
    ehrFileTypes: 'jpeg,jpg,png,gif,tiff,tif,bmp,pdf,json,txt,text',
    seedDB: process.env.SEED_DB || true,
    database: {
      name: process.env.MONGODB_NAME || 'edehr-dev',
      host: process.env.MONGODB_HOST || 'localhost',
      port: process.env.MONGODB_PORT || 27018,
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PWORD,
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
      debug: process.env.MONGODB_DEBUG || false
    },
    defaultConsumerKey: process.env.DEFAULT_CONSUMER_KEY || 'edehrkey',
    ehr: {
      defaultAssignmentDescription: Text.DEFAULT_ASSIGNMENT_DESCRIPTION
    },
    sessionTTL: process.env.TIME_TO_LIVE || 3600,
    sessionPath: process.env.SESSION_DIR || '.session',
    favicon: process.env.FAVICON || 'favicon.ico'
  }
}

/////////////////  PRODUCTION
function productionConfig (cfg) {
  cfg.isDevelop = false
  cfg.isProduction = true
  cfg.cookieSettings.secure = true
  cfg.traceApiCalls = true
  cfg.scheme = process.env.SCHEME || 'https'
  cfg.apiHost = process.env.DOMAIN || undefined
  cfg.apiPort = process.env.API_PORT || undefined
  cfg.clientPort = process.env.CLIENT_PORT || undefined
  cfg.clientHost = process.env.DOMAIN || undefined
  cfg.database.name = process.env.MONGODB_NAME || 'edehr-prod'
  return cfg
}

/////////////////  TEST
function testConfig (cfg) {
  cfg.apiToken='1234567890'
  cfg.apiPort = process.env.API_PORT || 27001
  cfg.appTitle = cfg.appTitle + ' - Test Environment'
  cfg.database.name = process.env.MONGODB_NAME || 'edehr-test'
  return cfg
}

///////////////// DEVELOPMENT
function developConfig (cfg) {
  cfg.appTitle = cfg.appTitle + ' ' + moment().format('DD hh:mm')
  return cfg
}

////////////////
export function getDbUri (config) {
  const dbc = config.database
  let auth = false
  let uri = []
  uri.push('mongodb://')
  if (dbc.user && dbc.password) {
    auth = true
    uri.push(dbc.user)
    uri.push(':')
    uri.push(dbc.password)
    uri.push('@')
  }

  uri.push(dbc.host)
  uri.push(':')
  uri.push(dbc.port)
  uri.push('/')
  uri.push(dbc.name)
  // https://stackoverflow.com/questions/40608669/what-does-authsource-means-in-mongo-database-url/55779444#55779444
  if (auth) uri.push('?authSource=admin')
  uri = uri.join('')
  const sanitized = auth ? uri.replace(dbc.password, 'aPassword') : uri
  debug('DB: URN sanitized: ====  %s', sanitized)
  debug('DB: Options: %o', dbc.options)
  debug('DB: ehrApp', uri)
  return uri
}
////////////////
/*
Set cookie security options

Set the following cookie options to enhance security:
    secure - Ensures the browser only sends the cookie over HTTPS.
    httpOnly - Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
    domain - indicates the domain of the cookie; use it to compare against the domain of the server in which
    the URL is being requested. If they match, then check the path attribute next.
    By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.
    path - indicates the path of the cookie; use it to compare against the request path. If this and domain match, then send the cookie in the request.
    expires - use to set expiration date for persistent cookies.

 */
function cookieSettings () {
  return {
    secure: false,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60000 * 24
  }
}

/////////////////

function composeUrl (scheme, host, port, part) {
  return scheme + '://' + host + (port ? ':' + port : '') + (part ? '/' + part : '')
}

function validateEnvironmentVariable (env) {
  if (env === 'development' || env === 'test' || env === 'production') {
    let beStrictOnProd = true
    if (beStrictOnProd && env === 'production') {
      if (!process.env.COOKIE_SECRET || process.env.COOKIE_SECRET === DEFAULT_COOKIE_SECRET) {
        throw new Error('For production you must set COOKIE_SECRET env ')
      }
    }
  } else {
    throw new Error('environment must be one of test, development or production')
  }
}

function asStringForLog (configuration) {
  let tmp = {}
  try {
    tmp = JSON.parse(JSON.stringify(configuration))
  } catch (error) {
    logError('Error cloning configuration %o', error)
  }
  tmp.database.password = 'sanitizedFor2'
  tmp.cookieSecret = 'sanitized cookie secret'
  tmp.authTokenSecret = 'sanitized auth token'
  return JSON.stringify(tmp, null, 2)
}

export default function applicationConfiguration (env) {
  validateEnvironmentVariable(env)
  debug('set up config for this environment:', env)
  const dCfg = defaultConfig(env)
  const cfg = env === 'production' ? productionConfig(dCfg)
    : env === 'test' ? testConfig(dCfg)
      : developConfig(dCfg)
  cfg.clientUrl = composeUrl(cfg.scheme, cfg.domain, cfg.clientPort)
  cfg.apiUrl = composeUrl(cfg.scheme, cfg.apiHost, cfg.apiPort, 'api')
  details('configuration %s', asStringForLog(cfg))
  return cfg
}