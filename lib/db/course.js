import { ObjectId } from "mongodb";

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
