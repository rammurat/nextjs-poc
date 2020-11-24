import nextConnect from 'next-connect';
import middleware from '../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('products').findOne()
    console.log(doc);
    res.json(doc);
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