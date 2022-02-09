import { MongoClient } from 'mongodb';


global.mongo = global.mongo || {}

export const connectToDB = async () => {
    console.log("begin connection");
    if (!global.mongo.client) {
        console.log("test");
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
        global.mongo.client = new MongoClient(process.env.MONGODB_URI, options)
        console.log("connecting to MongoDB cluster")
        await global.mongo.client.connect();
        console.log("connected to MongoDB cluster");
    }
    const db = global.mongo.client.db('educationalplatform')

    return {db, dbClient: global.mongo.client}
}