import { type Db, MongoClient } from "mongodb";
import { ROUTINE_DB_NAME } from "./constants";

const cachedDbs: { [key: string]: Db } = {};
let client: MongoClient | null = null;
const connectionState = { isConnected: false };

const connect = async (dbName: string) => {
  try {
    client = await new MongoClient(process.env.MONGODB_URI!, {
      maxPoolSize: 10,
    });
    client.on("open", () => (connectionState.isConnected = true));
    client.on("close", () => (connectionState.isConnected = false));
    cachedDbs[dbName] = client.db(dbName);
    connectionState.isConnected = true;
  } catch (error) {
    console.error("ERROR aquiring DB Connection!");
    console.error(error);
  }
};

export const getDatabase = async (dbName: string = ROUTINE_DB_NAME) => {
  if (client === null) await connect(dbName);
  if (!connectionState.isConnected) await client!.connect();
  if (!cachedDbs[dbName]) cachedDbs[dbName] = client!.db(dbName);
  return cachedDbs[dbName];
};
