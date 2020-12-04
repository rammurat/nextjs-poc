import nextConnect from 'next-connect';
import {middleware} from '../../../middleware/database';
import {findDocument} from '../../../utils/db-utils'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const {
    query: { pid },
  } = req

  let collection = await req.db.collection('products')
  const result = await findDocument(collection, pid)
  res.json(result);
});


export default handler;