export const getContent = async (db, filters, lastItemId, lastItemTime) => {
    if (!lastItemId) {
        return db.collection('content').find(filters)
            .project({
                children: 0,
            })
            .sort({timestamp: 1})
            .limit(1)
            .toArray();
    }
    return db.collection('content').find({ 
        _id: lastItemId,
        timestamp: {$gt : lastItemTime},
        ...filters,
        })
        .project({
            children: 0,
        })
        .sort({timestamp : 1})
        .limit(1)
        .toArray();
}

export const getContentSearchTags = async (db, categories) => {
    return await Promise.all(categories.map(category => fetchDistinctTagValues(db, category)))
}

const fetchDistinctTagValues = async (db, category) => {
    let mappings = await db.collection('content').distinct(category, {});
    mappings = mappings.map(subcategory => {
        return {value: subcategory, label: subcategory}
    })
    return {
        category: category,
        subCategories: mappings
    }
}