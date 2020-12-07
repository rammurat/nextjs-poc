import nextConnect from 'next-connect';
import {middleware} from '../../middleware/database';
import {searchDocumentsWhere} from '../../utils/db-utils'

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const {
      query: { text },
    } = req
    const _query =  { $text: { $search: text } }
    const collection = await req.db.collection('products')
    const result = await searchDocumentsWhere(collection, _query)

    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Entry failed due to server/database error', error });
  }
});

handler.post(async (req, res) => {
  try {
    const {text} = req.body
    const _query =  { $text: { $search: text } }
    const collection = await req.db.collection('products')
    const result = await searchDocumentsWhere(collection, _query)

    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Entry failed due to server/database error', error });
  }
});

export default handler;