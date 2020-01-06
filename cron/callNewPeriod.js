const api = require('../eosjs')().api
const tx = {"delay_sec":0,"max_cpu_usage_ms":0,"actions":[{"account":"bo1dcustodia","name":"newperiode","data":{"message":"","dac_id":"boidtestdac2"},"authorization":[{"actor":"bo1dcustodia","permission":"active"}]}]}
const print = (data) => console.log(data.transaction_id)
const err = (error) => console.error(error.toString())

api.transact(tx,{blocksBehind:10,expireSeconds:30}).then(print).catch(err)
