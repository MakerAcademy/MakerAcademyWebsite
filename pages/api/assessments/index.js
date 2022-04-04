import clientPromise from "lib/db/connect";
import { addToContentDraft } from "lib/db/content";
import {
  addToContent,
  createAssessment,
  getOneAssessment,
  submitAssessment,
} from "lib/db/assessment";
import validateJSON from "lib/db/utils";
import { ObjectId } from "mongodb";
import sanitize from "mongo-sanitize";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const _id = sanitize(req.query._id);
  const uid = sanitize(req.query.uid);
  const like = req.query.like;
  const submit = req.query.submitAssessment === "true";

  switch (req.method) {
    case "GET":
      return await fetchOneAssessment(req, res, db, _id);
    case "POST":
      if (submit) {
        return await submitOneAssessment(req, res, db, _id);
      }
      return await createOneAssessment(req, res, db, _id);
  }
}

async function fetchOneAssessment(req, res, db, _id) {
  if (!_id) {
    return res.status(400).end();
  }

  try {
    const docs = await getOneAssessment(db, _id);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function submitOneAssessment(req, res, db) {
  const body = sanitize(req.body);

  const expectedFields = [];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  body.author = ObjectId(body.author);
  body.assessment = ObjectId(body.assessment);

  try {
    const documentStatus = await submitAssessment(db, body);

    return res.status(200).json({
      _id: documentStatus.insertedId,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function createOneAssessment(req, res, db, _id) {
  const body = sanitize(req.body);

  const expectedFields = [];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  body.author = ObjectId(body.author);

  const isNewAssessment = body.status === "published";

  try {
    const documentStatus = await createAssessment(db, body);

    let contentStatus = null;

    if (isNewAssessment) {
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
