import moment from "moment";
import { ObjectId } from "mongodb";

export const getOneDocument = async (db, id) => {
  const slug = ObjectId(id);
  const oneDocPipeline = [
    { $match: { _id: slug } },
    {
      $lookup: {
        from: "user_profile",
        as: "user",
        let: { authorId: "$author" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$authorId", "$_id"] } } },
          { $project: { _id: 0, username: 1 } },
        ],
      },
    },
    { $unwind: { path: "$user" } },
    { $replaceRoot: { newRoot: { $mergeObjects: ["$user", "$$ROOT"] } } },
    { $project: { user: 0 } },
  ];
  const doc = await db
    .collection("documents")
    .aggregate(oneDocPipeline)
    .toArray();
  const d = doc[0];
  d._id = d._id.toString();
  d.author = d.author.toString();
  return d;
};

export const getCourseDocuments = async (db, doc_ids) => {
  return db.collection("documents").find({ _id: { $in: doc_ids } });
};

export const incrementDocField = async (db, docId, field) => {
  return db
    .collection("content")
    .updateOne(
      { $match: { published: ObjectId(docId) } },
      { $inc: { $$field: 1 } }
    );
};

export const createDocument = async (db, doc) => {
  const docId = db.collection("content").insertOne({
    ...doc,
    timestamp: moment.utc().format(),
  });
};
