import { ObjectId } from "mongodb";
import moment from "moment";

export const getOneAssessment = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);

  const oneAssessmentPipeline = [
    { $match: { _id: slug } },
    {
      $lookup: {
        from: "assessments",
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
    .aggregate(oneAssessmentPipeline)
    .toArray();

  const d = JSON.parse(JSON.stringify(doc[0] || {}));

  return d;
};

export const getSubmittedAssessment = async (db, _id, _author) => {
  if (!_id || !_author) return null;

  const assessmentId = ObjectId(_id);
  const authorId = ObjectId(_author);

  const doc = await db
    .collection("assessment_submissions")
    .find({ assessment: assessmentId, author: authorId })
    .toArray();

  const d = JSON.parse(JSON.stringify(doc[0] || {}));

  return d;
};

export const getOneAssessmentAnswers = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);

  const oneAssessmentPipeline = [
    { $match: { _id: slug } },
    {
      $lookup: {
        from: "assessments",
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
    { $project: { questions: 1, answers: 1 } },
  ];

  const doc = await db
    .collection("content")
    .aggregate(oneAssessmentPipeline)
    .toArray();

  const d = JSON.parse(JSON.stringify(doc[0] || {}));

  return d;
};

export const createAssessment = async (db, doc) => {
  return db.collection("assessments").insertOne({
    ...doc,
    timestamp: moment.utc().format(),
  });
};

export const addToContent = (db, doc) => {
  return db.collection("content").insertOne({
    ...doc,
    contentType: "assessments",
    likes: [],
    views: 0,
    contributors: [],
    drafts: [],
    status: "pending",
  });
};

export const submitAssessment = async (db, doc) => {
  return await db.collection("assessment_submissions").insertOne({
    ...doc,
    status: "submitted",
  });
};
