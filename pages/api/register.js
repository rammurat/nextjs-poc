import { hash } from 'argon2';
import nextConnect from 'next-connect';
import {middleware} from '../../middleware/database';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const {email, password, name} = req.body
    const hashedPassword = await hash(password);

    const id = await req.db.collection('users').find().count()
    const data = {
        id: id + 1,
        user_id: 2,
        email,
        name,
        password: hashedPassword
     }
    let doc = await req.db.collection('users').insertOne(data)
    res.status(200).json({ message: 'User added', user: doc.ops ? doc.ops[0] : {} });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Entry failed due to server/database error', error });
  }
});

export default handler;