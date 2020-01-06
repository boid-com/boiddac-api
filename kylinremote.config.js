module.exports = {
  fillClusterSize: 4,
  clusterSize: 10,
  mongo: {
    url: 'mongodb://localhost:27017',
    dbName: 'boiddac',
    traceCollection: 'traces',
    stateCollection: 'states'
  },
  amq: {
    connectionString: 'amqp://rabbitmq:rabbitmq@localhost:5672/boiddac_kylin'
  },
  ws: {
    host: '127.0.0.1',
    port: '3030'
  },
  ipc: {
    id: 'livenotifications',
    appspace: 'boiddac.'
  },
  eos: {
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    endpoint: 'https://api.dac.boid.com:1111',
    wsEndpoint: 'ws://localhost:8887',
    msigContract: 'eosio.msig',
    dacGenesisBlock: 76588164, // the first block that includes any dac contract actions including the initial setcode
    dacDirectoryContract: 'dacdirectory',
    legacyDacs: [],
    dacDirectoryMode: 'all',
    dacDirectoryDacId: null,
    dacMsigContract:'bo1dmultisig'
  },
  logger: {
    level: 'info',
    environment: 'kylin',
    datadog: {
      apiKey: ''
    }
  }
}
