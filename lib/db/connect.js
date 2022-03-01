import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
global.mongo = global.mongo || {};
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let db;
let dbClient;

export const connectToDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(uri, options);
    console.log("connecting to MongoDB cluster");
    dbClient = global.mongo.client.connect();
    console.log("connected to MongoDB cluster");
    db = global.mongo.client.db("production");
  } else {
    if (!db && !dbClient) {
      db = global.mongo.client.db("production");
      dbClient = global.mongo.client.connect();
    }
  }
  return { db, dbClient };
};
