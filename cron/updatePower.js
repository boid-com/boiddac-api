const {api,rpc} = require('../eosjs')()
const print = (data) => console.log(data.transaction_id)
const err = (error) => console.error(error.toString())
const random = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)

async function getCandidates () {
  try {
    let res = await rpc.get_table_rows({ "json": true, "code": "bo1dcustodia", "scope": "boidtestdac2", "table": "candidates", "table_key": "", "lower_bound": "", "upper_bound": "", "index_position": 1, "key_type": "", "limit": -1, "reverse": false, "show_payer": false })
    return res.rows
  } catch (error) {
    console.error(error)
    alert(error.toString())
    return []
    return { error: error.toString() }
  }
}

async function updatePwr(acct,boidpower) {
  const result = await api.transact(
    {
      actions: [{
        account: 'bo1ddactoken',
        name: 'updatepower',
        authorization: [{
          actor:'bo1ddactoken',
          permission: 'active',
        }],
        data: {
          acct,
          boidpower
        },
      }]
    },
    { blocksBehind: 6, expireSeconds: 30 }
  )
  return result
}

async function init(){
  const candidates = (await getCandidates()).map(el => el.candidate_name)
  console.log(candidates)
  const actions = []
  for (candidate of candidates) {
    await updatePwr(candidate,random(100,1000)).then(print).catch(err)
  }
}


// api.transact(tx,{blocksBehind:10,expireSeconds:30}).then(print).catch(err)


init()