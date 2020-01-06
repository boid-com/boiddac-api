var express = require('express')
var proxy = require('http-proxy-middleware')
var fs = require('fs')
var https = require('https')
const path = require('path')
const ms = require('human-interval')
const cors = require('cors')
const env = require('./.env.js')
const keyPath = path.join(__dirname,'greenlock.d','live',env.hostname)

const credentials = {
	key: fs.readFileSync(path.join(keyPath,'privkey.pem'), 'utf8'),
	cert: fs.readFileSync(path.join(keyPath,'cert.pem'), 'utf8'),
	ca: fs.readFileSync(path.join(keyPath,'chain.pem'), 'utf8')
}
const defaultThrottleData = {windowMs: ms('10 minutes'), delayAfter: 100, delayMs: 15000}
const defaultLimitData = {windowMs: ms('10 minutes'), max: 500}


async function setupProxy(port,target,customThrottleData,customLimitData) {
  if (!customThrottleData) customThrottleData = defaultThrottleData
  if (!customLimitData) customLimitData = defaultLimitData
  var app = express()
  app.use(cors())
  app.options('*', cors())
  app.use(require("express-slow-down")(customThrottleData))
  app.use(require("express-rate-limit")(customLimitData))
  app.use('/*',proxy({ target, changeOrigin: true }))
  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(port, () => {
    console.log('HTTPS Server running on port 443')
  })
}

setupProxy(443,'http://localhost:8383')
setupProxy(1111,'http://localhost:8888')
setupProxy(4040,'http://localhost:3030')