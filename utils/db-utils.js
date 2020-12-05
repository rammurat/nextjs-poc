const findDocument = async function(collection, pid) {
    return collection.findOne({id: parseInt(pid)});
}

const findDocuments = async function(collection) {
    return collection.find({}).toArray();
}

const aggregate = async function(collection) {
    const _lookup = {
        from: 'sub-categories',
        localField: 'id',
        foreignField: 'cat_id',
        as: 'sub_cats'
    }
    return collection.aggregate( [ { $lookup : _lookup } ]).toArray();
}

export {findDocument, findDocuments, aggregate}