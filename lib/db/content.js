import { ObjectId } from "mongodb";
import { TAGS } from "@constants/tags";

export const getContent = async (db) => {
  const documentPipeline = [
    { $match: { contentType: "documents", status: "published" } },
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
    { $match: { contentType: "courses", status: "published" } },
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
    result.likes = result.likes.map((like) => like.toString());
  });
  const tags = TAGS.map((tag) => {
    return {
      category: tag,
      subCategories: Array.from(
        new Set(results.map((result) => result[tag]))
      ).map((subcategory) => {
        return {
          value: { category: tag, subcategory: subcategory },
          label: subcategory,
        };
      }),
    };
  });
  return [results, tags];
};

export const addToContentLikes = async (db, _id, uid) => {
  const contentId = ObjectId(_id);
  const userId = ObjectId(uid);

  return db
    .collection("content")
    .updateOne({ _id: contentId }, { $addToSet: { likes: userId } });
};

export const removeFromContentLikes = async (db, _id, uid) => {
  const contentId = ObjectId(_id);
  const userId = ObjectId(uid);

  return db
    .collection("content")
    .updateOne({ _id: contentId }, { $pull: { likes: userId } });
};

export const acceptEdit = async (db, publishedId, draftId) => {
  const cid = ObjectId(publishedId);
  const did = ObjectId(draftId);
  const updateContent = await db
    .collection("content")
    .updateOne(
      { published: cid },
      { $set: { published: did }, $pull: { drafts: did } }
    );
  const updatePublished = await db
    .collection("documents")
    .updateOne({ _id: draftId }, { $set: { status: "published" } });
  const deleteOld = await db.collection("documents").deleteOne({ _id: cid });

  return true;
};

export const rejectEdit = async (db, publishedId, draftId) => {
  const cid = ObjectId(publishedId);
  const did = ObjectId(draftId);
  const updateContent = db
    .collection("content")
    .updateOne({ published: cid }, { $pull: { drafts: did } });
  const removeDraft = db.collection("documents").deleteOne({ _id: did });

  return true;
};

export const acceptPending = async (db, _id) => {
  const contentId = ObjectId(_id);

  return await db
    .collection("content")
    .updateOne({ _id: contentId }, { $set: { status: "published" } });
};

export const rejectPending = async (db, _id) => {
  const contentId = ObjectId(_id);

  await db.collection("content").deleteOne({ _id: contentId });
};

export const getAdminContent = async (db) => {
  const documentPipeline = [
    { $match: { contentType: "documents" } },
    {
      $lookup: {
        from: "documents",
        as: "doc",
        let: { docId: "$published" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$docId", "$_id"] } } },
          { $project: { author: 0, _id: 0 } },
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
    result.likes = result.likes.map((like) => like.toString());
  });

  return results.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {});
};
