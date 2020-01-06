const { JsonRpc,Api } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const { TextDecoder, TextEncoder } = require('util')
const { loadConfig } = require('./functions')
const env = require('./.env')
const config = loadConfig()
function init(keys) {
  if (!keys) keys = env.keys
  const signatureProvider = new JsSignatureProvider(keys)
  const fetch = require('node-fetch')
  var rpc = new JsonRpc(config.eos.endpoint, { fetch })
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
  return {api,rpc}
}

module.exports = init