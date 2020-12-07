import nextConnect from 'next-connect';
import {middleware} from '../../middleware/database';
import {findDocuments} from '../../utils/db-utils'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let collection = await req.db.collection('sub_categories')
    const result = await findDocuments(collection)
    res.json(result);
});

export default handler;