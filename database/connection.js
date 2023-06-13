import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";

export const collections = {}

export async function connectToDatabase () {
    dotenv.config();

    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db = client.db(process.env.DB_NAME);

    //* TODO add collections for game.
    // const gamesCollection = db.collection(process.env.GAMES_COLLECTION_NAME);
    // collections = gamesCollection;

    //console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
}