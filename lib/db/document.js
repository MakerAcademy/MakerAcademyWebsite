import moment from "moment";
import { ObjectId } from "mongodb";

export const getOneDocument = async (db, id) => {
  const slug = ObjectId(id);
  const oneDocumentPipeline = [
    { $match: { _id: slug } },
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
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: ["$$ROOT", "$username"] },
      },
    },
    { $project: { doc: 0 } },
  ];
  const doc = await db
    .collection("content")
    .aggregate(oneDocumentPipeline)
    .toArray();
  const d = doc[0];
  d._id = d._id.toString();
  d.author = d.author.toString();
  d.published = d.published.toString();
  return d;
};

export const getUserDocuments = async (db, id) => {
  const slug = ObjectId(id);
  const userDocumentPipeline = [
    { $match: { author: slug, contentType: "documents" } },
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
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: ["$$ROOT", "$username"] },
      },
    },
    { $project: { doc: 0 } },
  ];
  const docs = await db
    .collection("content")
    .aggregate(userDocumentPipeline)
    .toArray();
  return docs.map((d) => {
    d._id = d._id.toString();
    d.author = d.author.toString();
    d.published = d.published.toString();
  });
};

export const getCourseDocuments = async (db, doc_ids) => {
  return db.collection("documents").find({ _id: { $in: doc_ids } });
};

export const incrementDocViews = async (db, id) => {
  const slug = ObjectId(id);
  console.log(slug);
  return db
    .collection("content")
    .updateOne({ _id: slug }, { $inc: { views: 1 } }, {});
};

export const incrementDocLikes = async (db, id) => {
  const slug = ObjectId(id);
  return db
    .collection("content")
    .updateOne({ _id: slug }, { $inc: { likes: 1 } }, {});
};

export const decrementDocLikes = async (db, id) => {
  const slug = ObjectId(id);
  return db
    .collection("content")
    .updateOne({ _id: slug }, { $inc: { likes: -1 } }, {});
};

export const createDocument = async (db, doc) => {
  const response = await db.collection("documents").insertOne({
    ...doc,
    timestamp: moment.utc().format(),
  });
  const docId = response.insertedId;
  console.log(docId);
};
