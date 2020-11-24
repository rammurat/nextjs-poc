import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb://localhost:27017/admin?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('debenhams');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;