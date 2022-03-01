import { ObjectId } from "mongodb";

export const getPrograms = async (db, filters, lastItem) => {
  const docs = await db
    .collection("programs")
    .aggregate([
      {
        $lookup: {
          from: "content",
          localField: "children",
          foreignField: "_id",
          as: "courses",
        },
      },
    ])
    .toArray();

  for (let i in docs) {
    docs[i]._id = docs[i]._id.toString();
    docs[i].author = docs[i].author.toString();
  }

  return docs;
};

export const getOneProgram = async (db, id) => {
  if (!id) return null;

  const slug = ObjectId(id);

  const docs = await db
    .collection("programs")
    .aggregate([
      {
        $match: { _id: slug },
      },
      {
        $lookup: {
          from: "content",
          localField: "children",
          foreignField: "_id",
          as: "courses",
        },
      },
    ])
    .toArray();

  const doc = docs[0];

  doc._id = doc._id.toString();
  doc.author = doc.author.toString();
  doc.courses = doc.courses.map((i) => i.toString());

  return doc;
};

export const getProgramSearchTags = async (db, categories) => {
  return await Promise.all(
    categories.map((category) => fetchDistinctTagValues(db, category))
  );
};

const fetchDistinctTagValues = async (db, category) => {
  let mappings = await db.collection("programs").distinct(category, {});
  mappings = mappings.map((subcategory) => {
    return { value: { [category]: subcategory }, label: subcategory };
  });
  return {
    category: category,
    subCategories: mappings,
  };
};

export const getCountEstimate = async (db, collection) => {
  return db.collection(collection).estimatedDocumentCount();
};
