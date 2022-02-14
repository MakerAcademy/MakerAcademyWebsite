export const getOneCourse = async (db, id) => {
  return db.collection('content').aggregate([
    {
      $match: {"_id": id},
    },
    {
      $lookup:
        {
          from: 'content',
          localField: 'children',
          foreignField: '_id',
          as: 'documents'
        },
    }
  ]).toArray();
}