import { CosmosClient } from "@azure/cosmos";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
  agent
});

export const db = client.database("TodoDB");
export const tasks = db.container("Tasks");
export const users = db.container("Users");
