import { ObjectId } from "mongodb";
import moment from "moment";

export const getOneCourse = async (db, id) => {
  if (!id || id === "undefined") return null;

  const slug = ObjectId(id);

  const oneCoursePipeline = [
    { $match: { _id: slug } }, // match based on the id provided
    {
      $lookup: {
        from: "courses", //from collection
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
    { $replaceRoot: { newRoot: { $mergeObjects: ["$doc", "$$ROOT"] } } }, // merge and flatten the doc to root object
    {
      $lookup: {
        // Get the username from the author id then flatten just like above
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
    { $project: { doc: 0 } }, // Remove the doc variable as its already flattened to root

    // Documents
    {
      $lookup: {
        // For every doc, get data from content
        from: "content",
        as: "_documents",
        let: { docId: "$documents" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$docId._id"] } } },
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
          { $project: { doc: 0 } },
        ],
      },
    },
    // Assessments
    {
      $lookup: {
        // For every doc, get data from content
        from: "content",
        as: "_assessments",
        let: { docId: "$documents" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$docId._id"] } } },
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
          { $project: { doc: 0 } },
        ],
      },
    },
  ];

  const doc = await db
    .collection("content")
    .aggregate(oneCoursePipeline)
    .toArray();

  const d = JSON.parse(JSON.stringify(doc[0] || {}));

  const _temp = [...(d?._assessments || []), ...(d?._documents || [])];

  const _docs = d?.documents
    ?.map?.((i) => {
      return _temp.find((j) => i._id === j._id);
    })
    ?.filter?.(Boolean);

  delete d._assessments;
  delete d._documents;
  d.docs = _docs;

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
