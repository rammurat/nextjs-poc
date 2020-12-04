const findDocument = async function(collection, pid) {
    return collection.findOne({id: parseInt(pid)});
}

const findDocuments = async function(collection) {
    return collection.find({}).toArray();
}

export {findDocument, findDocuments}