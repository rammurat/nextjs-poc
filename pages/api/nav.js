import nextConnect from 'next-connect';
import {middleware} from '../../middleware/database';
import {aggregate} from '../../utils/db-utils'

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
    let collection = await req.db.collection('categories')
    const result = await aggregate(collection)
    res.json(result);
});

export default handler;