import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI
global.mongo = global.mongo || {}

export const connectToDB = async () => {
    console.log("begin connection");
    if (!global.mongo.client) {
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
        global.mongo.client = new MongoClient(uri, options)
        console.log("connecting to MongoDB cluster")
        await global.mongo.client.connect();
        console.log("connected to MongoDB cluster");
    }
    const db = global.mongo.client.db('educationalplatform');

    return {db: db, dbClient: global.mongo.client}
}