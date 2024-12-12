// lib/mongodb.js

import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  try {   
    await client.connect();
    return client.db();
  } catch (error) {
    console.error("Error al intentar conectarse a la base de datos", error);
    throw error;
  }
}
