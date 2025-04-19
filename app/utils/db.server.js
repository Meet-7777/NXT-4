import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri || !dbName) {
  throw new Error("Missing MongoDB environment variables");
}
let cachedClient = null;

export async function connectToDatabase() {
  if (
    cachedClient &&
    cachedClient.topology &&
    cachedClient.topology.isConnected()
  ) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    throw error;
  }
}

export async function insertDocument(collectionName, document) {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const docToInsert = { ...document };

    if (docToInsert._id) {
      delete docToInsert._id;
    }

    const result = await collection.insertOne(docToInsert);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function findDocuments(collectionName, query = {}) {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = await collection.find(query).toArray();
    return documents;
  } catch (error) {
    throw error;
  }
}
