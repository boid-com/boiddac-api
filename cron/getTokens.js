const ax = require('axios')
const accounts = [
  'bo1daccounts',
  'boiddacauth2',
  'bo1ddacfunds',
  'bo1ddacowner',
  'bo1dcustodia',
  'dacdirectory',
  'boidescrow11',
  'bo1ddactoken',
  'bo1dmultisig',
  'boidproposal',
  'boiddistribu',
  'boidreferend'
]
const random = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
const randomSelect = (arr) => arr[random(0, arr.length - 1)]
const sleep = ms => new Promise(res => setTimeout(res, ms))

var i = 0
async function init(){
  while (i < 20){
    i ++
    await ax.get('http://faucet.cryptokylin.io/get_token/'+randomSelect(accounts))
    .then(el=>console.log(JSON.stringify(el.data,null,2)))
  }

}

init().catch(async err => {
      if(err.response && err.response.data) console.error(err.response.data)
      else console.error(err.toString())
      await sleep(random(9999,9999999))
    }
  ).then(async el => await sleep(random(9999,9999999)))