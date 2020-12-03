import nextConnect from 'next-connect';
import {middleware} from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

const findDocuments = async function(collection) {
    return collection.find({}).toArray();
}

handler.get(async (req, res) => {
    let collection = await req.db.collection('products')
    const result = await findDocuments(collection)
    res.json(result);
});

handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);
    let doc = await req.db.collection('products').insertOne({$set:data}, {upsert: true})

    if(doc) {
        res.json({message: 'ok'});
    } else {
        res.json({message: 'Entry failed due to server/database error'});
    }
})

export default handler;