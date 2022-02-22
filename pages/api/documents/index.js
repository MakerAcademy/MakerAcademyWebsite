import { connectToDB } from "../../../lib/db/connect";
import {getOneDocument, createDocument, updateOneDocument} from "../../../lib/db/document";
import validateJSON from "../../../lib/db/utils";

export default async function handler(req, res) {
  const {db} = await connectToDB();
  switch (req.method) {
    case "GET":
      return await fetchOneDoc(req, res, db);
    case "POST":
      return await createOneDoc(req, res, db);
  }
}

async function fetchOneDoc(req, res, db) {
  const body = req.body;
  const expectedFields = ['_id']
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }
  const id = body._id
  try {
    const docs = await getOneDocument(db, id);
    return res.status(200).json({
      message: docs,
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}


async function createOneDoc(req, res, db) {
  const body = req.body;
  const expectedFields = []
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  try {
    const status = await createDocument(db, body);
    return res.status(200).json({
      success: true
    })
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }

}