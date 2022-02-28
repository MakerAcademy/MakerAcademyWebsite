import { ObjectId } from "mongodb";
import { connectToDB } from "../../../lib/db/connect";
import {
  getOneDocument,
  createDocument,
  updateDocument,
  addToContent,
} from "../../../lib/db/document";
import validateJSON from "../../../lib/db/utils";

export default async function handler(req, res) {
  const _id = req.query._id;
  const { db } = await connectToDB();

  switch (req.method) {
    case "GET":
      if (_id) {
        return await fetchOneDoc(req, res, db, _id);
      } else {
        return await fetchDocs(req, res, db);
      }
    case "POST":
      return await createOneDoc(req, res, db, _id);
  }
}

async function fetchDocs() {}

async function fetchOneDoc(req, res, db, _id) {
  if (!_id) {
    return res.status(400).end();
  }

  try {
    const docs = await getOneDocument(db, _id);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function createOneDoc(req, res, db, _id) {
  const body = req.body;
  const expectedFields = [];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }
  body.author = ObjectId(body.author);

  try {
    const documentStatus = await createDocument(db, body);
    const contentStatus = await addToContent(db, {
      author: body.author,
      published: documentStatus.insertedId,
    });

    return res.status(200).json({
      _id: contentStatus.insertedId,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
