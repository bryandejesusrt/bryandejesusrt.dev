// lib/mongodb.js

import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  try {   
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("error to connet data base mongodb", error);
    throw error;
  }
}
