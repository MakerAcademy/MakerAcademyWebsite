import moment from "moment";
import { ObjectId } from "mongodb";

export const getOneDocument = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);

  const oneDocumentPipeline = [
    { $match: { _id: slug } }, // match based on the id provided
    {
      $lookup: {
        from: "documents", //from collection
        as: "doc", //as variable
        let: { docId: "$published" }, // create a variable docId from main published
        pipeline: [
          //sub pipeline
          { $match: { $expr: { $eq: ["$$docId", "$_id"] } } }, // match docid variable to id we get from params
          { $project: { author: 0, _id: 0 } }, // dont return these fields (0 - dont return, 1 - only return)
        ],
      },
    },
    { $unwind: { path: "$doc" } }, // flatten the field values (doc array to just doc)
    { $replaceRoot: { newRoot: { $mergeObjects: ["$doc", "$$ROOT"] } } }, // flatten it to most parent object
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
    { $project: { doc: 0 } }, // delete the doc object from initial lookup
  ];

  const doc = await db
    .collection("content")
    .aggregate(oneDocumentPipeline)
    .toArray();

  const d = JSON.parse(JSON.stringify(doc[0] || {}));

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

  return docs;
};

export const getCourseDocuments = async (db, doc_ids) => {
  return db.collection("documents").find({ _id: { $in: doc_ids } });
};

export const incrementDocViews = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);
  return db
    .collection("content")
    .updateOne({ _id: slug }, { $inc: { views: 1 } }, {});
};

export const createDocument = async (db, doc) => {
  return db.collection("documents").insertOne({
    ...doc,
    timestamp: moment.utc().format(),
  });
};

export const addToContent = (db, doc) => {
  return db.collection("content").insertOne({
    ...doc,
    contentType: "documents",
    likes: [],
    views: 0,
    contributors: [],
    drafts: [],
    status: "pending",
  });
};

export const getDraft = async (db, draftId) => {
  const slug = ObjectId(draftId);
  const draftPipeline = [
    { $match: { _id: slug } },
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
    .collection("documents")
    .aggregate(draftPipeline)
    .toArray();
  const d = JSON.parse(JSON.stringify(doc[0] || {}));

  return d;
};
