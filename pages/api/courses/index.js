import clientPromise from "lib/db/connect";
import { addToContentDraft } from "lib/db/content";
import { addToContent, createCourse, getOneCourse } from "lib/db/course";
import validateJSON from "lib/db/utils";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const _id = req.query._id;

  switch (req.method) {
    case "GET":
      return await fetchOneCourse(req, res, db, _id);
    case "POST":
      return await createOneCourse(req, res, db, _id);
  }
}

async function fetchOneCourse(req, res, db, _id) {
  if (!_id) {
    return res.status(400).end();
  }

  try {
    const docs = await getOneCourse(db, _id);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function createOneCourse(req, res, db, _id) {
  const body = req.body;
  const expectedFields = [];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  body.author = ObjectId(body.author);
  body.documents = body.documents?.map((i) => ({ ...i, _id: ObjectId(i._id) }));

  const isNewCourse = req.body.status === "published";

  try {
    const documentStatus = await createCourse(db, body);

    let contentStatus = null;

    if (isNewCourse) {
      contentStatus = await addToContent(db, {
        author: body.author,
        published: documentStatus.insertedId,
      });
    } else {
      contentStatus = await addToContentDraft(
        db,
        _id,
        documentStatus.insertedId
      );
    }

    return res.status(200).json({
      _id: contentStatus.insertedId,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
