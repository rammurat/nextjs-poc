const findDocument = async function(collection, query) {
    return collection.findOne(query);
}

const findDocuments = async function(collection) {
    return collection.find({}).toArray();
}

const aggregateLookup = async function(collection) {
    const _lookup = {
        from: 'sub_categories',
        localField: 'id',
        foreignField: 'cat_id',
        as: 'sub_cats'
    }
    return collection.aggregate( [ { $lookup : _lookup } ]).toArray();
}

const findDocumentsWhere = async function(collection, query) {
    return collection.find(query).toArray();
}

const searchDocumentsWhere = async function(collection, query) {
    return collection.find(query).toArray();
}

export {findDocument, findDocuments, aggregateLookup, findDocumentsWhere, searchDocumentsWhere}
