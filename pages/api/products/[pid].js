import nextConnect from 'next-connect';
import {middleware} from '../../../middleware/database';
import {findDocumentsWhere, findDocument} from '../../../utils/db-utils'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const {
      query: { pid },
    } = req

    // find sub category id to fetch the products
    var regex = new RegExp(["^", pid, "$"].join(""), "i");
    const query = {name: regex}
    const collection = await req.db.collection('sub-categories')
    const result = await findDocument(collection, query)

    // find products that belongs to the search sub categories
    const prodQuery = {sub_cat_id: result.id}
    let prodCollection = await req.db.collection('products')
    const prodResult = await findDocumentsWhere(prodCollection, prodQuery)

    res.json(prodResult);
});

export default handler;