import { connectToDB } from "../../../lib/db/connect";
import {
  getOneDocument,
  createDocument,
  updateDocument,
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
      if (_id) {
        return await updateOneDoc(req, res, db, _id);
      } else {
        return await createOneDoc(req, res, db);
      }
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

async function createOneDoc(req, res, db) {
  const body = req.body;
  const expectedFields = [];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  try {
    const status = await createDocument(db, body);

    return res.status(200).json({
      _id: status.insertedId,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function updateOneDoc(req, res, db, _id) {
  const body = req.body;
  const expectedFields = [];
  if (!_id || !validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  try {
    const status = await updateDocument(db, _id, body);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
