// export const getPrograms = async (db, filters, lastItemTime) => {
//   console.log("fetching programs");
//   if (!lastItemTime) {
//     return db.collection('programs').find(filters)
//       .sort({timestamp: 1})
//       .limit(20)
//       .toArray();
//   }
//   return db.collection('programs').find({
//     timestamp: {$gt : lastItemTime},
//     filters,
//   })
//     .sort({timestamp : 1})
//     .limit(20)
//     .toArray();
// }

export const getPrograms = async(db, filters, lastItem) => {
  return db.collection('programs').aggregate([
    {
      $lookup: {
        from: 'content',
        localField: 'children',
        foreignField: '_id',
        as: 'courses'
      }
    }
  ]).toArray();
}

export const getOneProgram = async (db, id) => {
  return db.collection('programs').aggregate([
    {
      $match: {"_id": id},
    },
    {
      $lookup:
        {
          from: 'content',
          localField: 'children',
          foreignField: '_id',
          as: 'courses'
        },
    }
  ]).toArray();
}


export const getProgramSearchTags = async (db, categories) => {
  return await Promise.all(categories.map(category => fetchDistinctTagValues(db, category)))
}

const fetchDistinctTagValues = async (db, category) => {
  let mappings = await db.collection('programs').distinct(category, {});
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