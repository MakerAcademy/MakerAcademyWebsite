import { ObjectId } from "mongodb";
import moment from "moment";

export const getOneCourse = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);

  const oneCoursePipeline = [
    { $match: { _id: slug } },
    {
      $lookup: {
        from: "courses",
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
    {
      $lookup: {
        from: "documents",
        as: "docs",
        let: { docId: "$documents" },
        pipeline: [{ $match: { $expr: { $in: ["$_id", "$$docId._id"] } } }],
      },
    },
  ];

  const doc = await db
    .collection("content")
    .aggregate(oneCoursePipeline)
    .toArray();

  const d = JSON.parse(JSON.stringify(doc[0] || {}));

  return d;
};

export const createCourse = async (db, doc) => {
  return db.collection("courses").insertOne({
    ...doc,
    timestamp: moment.utc().format(),
  });
};

export const addToContent = (db, doc) => {
  return db.collection("content").insertOne({
    ...doc,
    contentType: "courses",
    likes: [],
    views: 0,
    contributors: [],
    drafts: [],
    status: "pending",
  });
};
