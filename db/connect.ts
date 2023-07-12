import dotenv from "dotenv";
dotenv.config();
import { MongoClient, Db } from "mongodb";

let _db: Db;

const initDb = (callback: (error: Error | null, db?: Db) => void) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI as string)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = (): Db => {
  if (!_db) {
    throw new Error("Db not initialized");
  }
  return _db;
};

export default {
  initDb,
  getDb,
};
