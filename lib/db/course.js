import { ObjectId } from "mongodb";
import moment from "moment";

export const getOneCourse = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);
  const oneDocumentPipeline = [
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
  d.documents =
    d.documents?.map?.((i) => ({
      ...i,
      _id: i._id.toString(),
    })) || [];

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
