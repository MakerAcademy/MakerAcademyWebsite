import { ObjectId } from "mongodb";

export const getPrograms = async (db, filters, lastItem) => {
  const _docs = await db
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

  const docs = JSON.parse(JSON.stringify(_docs || []));

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

  const doc = JSON.parse(JSON.stringify(docs[0] || {}));

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
