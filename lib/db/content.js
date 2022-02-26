export const getContent = async (db, filters, lastItemTime) => {
    console.log("fetching content");
    if (!lastItemTime) {

        return db.collection('content').find(filters)
            .project({
                children: 0,
            })
            .sort({timestamp: 1})
            .limit(20)
            .toArray();
    }
    return db.collection('content').find({
        timestamp: {$gt : lastItemTime},
        filters,
        })
        .project({
            children: 0,
        })
        .sort({timestamp : 1})
        .limit(20)
        .toArray();
}

export const getNewContent = async (db) => {
    console.log("fetching content from new database");

}

export const getContentSearchTags = async (db, categories) => {
    return await Promise.all(categories.map(category => fetchDistinctTagValues(db, category)))
}

const fetchDistinctTagValues = async (db, category) => {
    let mappings = await db.collection('content').distinct(category, {});
    mappings = mappings.map(subcategory => {
        return {value: {[category]: subcategory}, label: subcategory}
    })
    return {
        category: category,
        subCategories: mappings
    }
}

export const getCountEstimate = async (db, collection) => {
    return db.collection(collection).estimatedDocumentCount();
}