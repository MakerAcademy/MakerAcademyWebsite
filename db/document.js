import {nanoid } from 'nanoid'

export const getOneDocument = async (db, id) => {
    return db.collection('documents').findOne({_id: id})
}

export const createDocument = async (db, doc) => {
    return db
        .collection('documents')
        .insertOne({
            _id: nanoid(21),
            ...doc,
            timestamp: new Date().toDateString,
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

    const updated = await db.collection('documents').findone({ _id: id})
    return updated
}