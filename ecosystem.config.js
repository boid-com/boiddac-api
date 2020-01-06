module.exports = {
  apps: [
    {
      name: 'filler-kylin',
      script: './eosdac-filler.js',
      node_args: ['--max-old-space-size=8192'],
      autorestart: true,
      kill_timeout: 3600,
      env: {
        CONFIG: 'kylin'
      }
    },
    {
      name: 'blockrange-kylin',
      script: './eosdac-blockrange.js',
      node_args: ['--max-old-space-size=8192'],
      autorestart: true,
      kill_timeout: 3600,
      env: {
        CONFIG: 'kylin'
      }
    },
    {
      name: 'processor-kylin',
      script: './eosdac-processor.js',
      autorestart: true,
      env: {
        CONFIG: 'kylin'
      },
      pmx: false
    },
    {
      name: 'api-kylin',
      script: './eosdac-api.js',
      autorestart: true,
      env: {
        CONFIG: 'kylin',
        SERVER_PORT: 8383,
        SERVER_ADDR: '0.0.0.0',
        HOST_NAME: 'api.dac.boid.com'
      },
      pmx: false
    },
    {
      name: 'ws-kylin',
      script: './eosdac-ws.js',
      autorestart: true,
      env: {
        CONFIG: 'kylin'
      },
      pmx: false
    },
    {
      name: 'proxy-kylin',
      script: './proxyServer.js',
      autorestart: true,
      env: {
        CONFIG: 'kylin'
      },
      pmx: false
    },
    {
      name: 'newPeriod-kylin',
      script: './cron/callNewPeriod.js',
      autorestart: true,
      restart_delay: 11000000,
      env: {
        CONFIG: 'kylin'
      },
      pmx: false
    },
    {
      name: 'updatePower-kylin',
      script: './cron/updatePower.js',
      autorestart: true,
      restart_delay: 5100000,
      env: {
        CONFIG: 'kylin'
      },
      pmx: false
    },
    {
      name: 'getTokens-kylin',
      script: './cron/getTokens.js',
      autorestart: true,
      restart_delay: 86400000,
      env: {
        CONFIG: 'kylin'
      },
      pmx: false
    }
  ]
}
