
const MongoClient = require('mongodb').MongoClient

const {getMsigProposalsSchema} = require('../schemas')

const connectMongo = require('../connections/mongo')

const {loadConfig} = require('../functions')


async function getMsigProposals(fastify, request) {
    // console.log(request)


    return new Promise(async (resolve, reject) => {
        const config = loadConfig()
        const mongo = await connectMongo(config)
        const db = mongo.db(config.mongo.dbName)
        const collection = db.collection('multisigs')

        const status = request.query.status || 0
        const skip = request.query.skip || 0
        const limit = request.query.limit || 20

        const query = {status:status}



        try {
            const res = await collection.find(query).skip(parseInt(skip)).limit(parseInt(limit))

            const proposals = []
            if (await res.count() == 0){
                resolve(proposals)
            }
            else {
                res.forEach((msig) => {
                    proposals.push(msig)
                }, () => {
                    resolve(proposals)
                })
            }
        }
        catch (e){
            reject(e)
        }

    })


}


module.exports = function (fastify, opts, next) {
    fastify.get('/get_msig_proposals', {
        schema: getMsigProposalsSchema.GET
    }, async (request, reply) => {
        reply.header('Access-Control-Allow-Origin', '*')
        reply.send(await getMsigProposals(fastify, request));
    });
    next()
};