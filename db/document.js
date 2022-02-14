import { nanoid } from "nanoid";

export const getOneDocument = async (db, id) => {
    return db.collection('content').findOne({_id: id})
}


export const getCourseDocuments = async (db, doc_ids) => {
  return db.collection('content').find({_id: {$in: doc_ids}})
}


export const createDocument = async (db, doc) => {
    return db
        .collection('documents')
        .insertOne({
            _id: nanoid(21),
            ...doc,
            timestamp: new Date(),
        })
        .then(({ops}) => ops[0])
}

export const updateOneDocument = async (db, id, updates) => {
    const operation = await db.collection('documents').updateOne(
        {
            _id: id,
        },
        { $set: updates},
    )

    if (!operation.result.ok) {
        console.log("could not update document")
    }

  return await db.collection('documents').findOne({ _id: id })
}
