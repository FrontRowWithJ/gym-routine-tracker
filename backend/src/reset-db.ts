import { MongoClient } from "mongodb";
import { ROUTINE } from "./constants.js";

const ROUTINE_COLLECTION_NAME = "routine_info";
const ROUTINE_DB_NAME = "routine_db";
const uri =
  process.env.MONGODB_URI ??
  "mongodb+srv://FrontRowWithJ:IThinkImHipster123@gym-cluster.tkt3mwj.mongodb.net/?retryWrites=true&w=majority";

const client = await MongoClient.connect(uri);
const database = client.db(ROUTINE_DB_NAME);

database
  .collection(ROUTINE_COLLECTION_NAME)
  .drop()
  .then(() => database.createCollection(ROUTINE_COLLECTION_NAME))
  .then((collection) => collection.insertOne(ROUTINE))
  .then(() => client.close());

// const id = "a541dc561891f9b731732490ee66aadc5da61007c5631b76e2b7ddac9d7d77d2";
// database
//   .collection(ROUTINE_COLLECTION_NAME)
//   .updateOne({}, { $set: { [id]: ROUTINE } })
//   .then(() => client.close());
