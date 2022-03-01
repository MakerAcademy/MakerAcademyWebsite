import { ObjectId } from "mongodb";

export const getContent = async (db) => {
  const documentPipeline = [
    { $match: { contentType: "documents" } },
    {
      $lookup: {
        from: "documents",
        as: "doc",
        let: { docId: "$published" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$docId", "$_id"] } } },
          { $project: { author: 0, _id: 0, body: 0 } },
        ],
      },
    },
    { $unwind: { path: "$doc" } },
    { $replaceRoot: { newRoot: { $mergeObjects: ["$doc", "$$ROOT"] } } },
    {
      $lookup: {
        from: "user_profile",
        as: "username",
        let: { authorId: "$author" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$authorId", "$_id"] } } },
          { $project: { _id: 0, username: 1 } },
        ],
      },
    },
    { $unwind: { path: "$username" } },
    { $replaceRoot: { newRoot: { $mergeObjects: ["$$ROOT", "$username"] } } },
    { $project: { doc: 0, drafts: 0 } },
  ];
  const coursePipeline = [
    { $match: { contentType: "courses" } },
    {
      $lookup: {
        from: "courses",
        as: "course",
        let: { courseId: "$published" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$courseId", "$_id"] } } },
          { $project: { author: 0, _id: 0, children: 0 } },
        ],
      },
    },
    { $unwind: { path: "$course" } },
    { $replaceRoot: { newRoot: { $mergeObjects: ["$course", "$$ROOT"] } } },
    {
      $lookup: {
        from: "user_profile",
        as: "username",
        let: { authorId: "$author" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$authorId", "$_id"] } } },
          { $project: { _id: 0, username: 1 } },
        ],
      },
    },
    { $unwind: { path: "$username" } },
    { $replaceRoot: { newRoot: { $mergeObjects: ["$$ROOT", "$username"] } } },
    { $project: { course: 0, drafts: 0 } },
  ];
  const docs = await db
    .collection("content")
    .aggregate(documentPipeline)
    .toArray();
  const courses = await db
    .collection("content")
    .aggregate(coursePipeline)
    .toArray();
  const results = docs.concat(courses);
  results.map((result) => {
    result._id = result._id.toString();
    result.author = result.author.toString();
    result.published = result.published.toString();
  });
  // console.log("courses:", results);
  return results;
};

export const getContentSearchTags = async (db, categories) => {
  return await Promise.all(
    categories.map((category) => fetchDistinctTagValues(db, category))
  );
};

const fetchDistinctTagValues = async (db, category) => {
  let mappings = await db.collection("content").distinct(category, {});
  mappings = mappings.map((subcategory) => {
    return { value: { [category]: subcategory }, label: subcategory };
  });
  return {
    category: category,
    subCategories: mappings,
  };
};

export const getCountEstimate = async (db, collection) => {
  return db.collection(collection).estimatedDocumentCount();
};

export const incrementContentLikes = async (db, id) => {
  const slug = ObjectId(id);
  return db
    .collection("content")
    .updateOne({ _id: slug }, { $inc: { likes: 1 } }, {});
};

export const decrementContentLikes = async (db, id) => {
  const slug = ObjectId(id);
  return db
    .collection("content")
    .updateOne({ _id: slug }, { $inc: { likes: -1 } }, {});
};
