import {  MongoClient } from 'mongodb';
global.mongo = global.mongo || {}

export const connectToDB = async () => {
    if (!global.mongo) {
        const client = new MongoClient(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            bufferMaxEntries: 0,
            connectionTimeoutMS: 10000
        })
        global.mongo.client = client

        console.log("connecting to MongoDB cluster")
        await global.mongo.client.connect();
        console.log("connected to MongoDB cluster");
    }
    const db = global.mongo.client.db('educationalplatform')

    return {db, dbClient: global.mongo.client}
}