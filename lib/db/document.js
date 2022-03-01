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
  d.drafts = d.drafts.map((i) => i.toString());
  d.contributors = d.contributors.map((i) => i.toString());
  d.likes = d.likes.map((i) => i.toString());
  d.likes_count = d.likes.length;

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
  });
};

export const addToContentDraft = (db, contentId, docId) => {
  const slug = ObjectId(contentId);
  const docSlug = ObjectId(docId);

  return db
    .collection("content")
    .updateOne({ _id: slug }, { $push: { drafts: docSlug } });
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
  const d = doc[0];
  // console.log("doc", doc);
  // console.log("d", d);
  d._id = d._id.toString();
  d.author = d.author.toString();
  // console.log(d);
  return d;
};

export const getUserEditSubmissions = async (db, id) => {
  const slug = ObjectId(id);
  const submissionsPipeline = [
    { $match: { author: slug } },
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
    {
      $lookup: {
        from: "documents",
        as: "drafts",
        let: { docId: "$drafts" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$docId"] } } },
          // { $project: { author: 0, _id: 0 } },
        ],
      },
    },
  ];
  const doc = await db
    .collection("content")
    .aggregate(submissionsPipeline)
    .toArray();
  doc.map((d) => {
    d._id = d._id.toString();
    d.author = d.author.toString();
    d.published = d.published.toString();
    d.contributors = d.contributors.map((i) => i.toString());
  });
  // console.log(doc);
  return doc;
};
