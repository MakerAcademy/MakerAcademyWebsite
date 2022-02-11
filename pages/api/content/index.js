import { connectToDB } from "../../../db/connect";
import { getContent } from "../../../db/content";
import validateJSON from "../../../db/utils";

export default async function handler(req, res) {
  const {db} = await connectToDB();
  switch (req.method) {
    case "POST":
      return await getMoreDocuments(req, res, db);
  }
}

async function getMoreDocuments(req, res, db) {
  const body = req.body
  const expectedFields = ['filters','lastItemTime']
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }
  try {
    const content = await getContent(db, body.filters, body.lastItemTime);
    return res.status(200).json({
      message: content,
      success: true
    });
  } catch (err) {
    return res.status(500).end();
  }


}

