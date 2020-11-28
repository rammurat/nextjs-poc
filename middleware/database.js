import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import {serverRuntimeConfig} from '../next.config'

const client = new MongoClient(serverRuntimeConfig.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('debenhams');
  db = req.db
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export {middleware, db};