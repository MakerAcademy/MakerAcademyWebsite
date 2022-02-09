import { nanoid } from "nanoid";

export const getContent = async (db, filters, lastItemId, lastItemTime) => {

    if (!lastItemId) {
        return db.collection('content').find(filters)
            .sort({timestamp: 1})
            .limit(20)
            .toArray();
    }
    return db.collection('content').find({ 
        _id: lastItemId,
        timestamp: {$gt : lastItemTime},
        ...filters,
        })
        .sort({timestamp : 1})
        .limit(20)
        .toArray();
}
