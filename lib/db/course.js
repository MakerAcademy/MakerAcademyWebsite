import { ObjectId } from "mongodb";
import moment from "moment";

export const getOneCourse = async (db, id) => {
  if (!id) return null;

  const slug = ObjectId(id);

  const docs = await db
    .collection("content")
    .aggregate([
      {
        $match: { _id: slug },
      },
      {
        $lookup: {
          from: "content",
          localField: "children",
          foreignField: "_id",
          as: "documents",
        },
      },
    ])
    .toArray();

  const doc = docs[0];

  // console.log(docs);

  // doc._id = doc._id.toString();
  // doc.author = doc.author.toString();

  return doc;
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
    contentType: "course",
    likes: [],
    views: 0,
    contributors: [],
    drafts: [],
    status: "pending",
  });
};
