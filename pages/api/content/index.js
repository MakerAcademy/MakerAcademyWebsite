import { connectToDB } from "../../../db/connect";
import { getContent } from "../../../db/content";
import validateJSON from "../../../db/utils";

export default async function handler(req, res) {
  const {db} = await connectToDB();
  console.log(req.params);
  switch (req.method) {
    case "POST":
      console.log('hi');
      return await getMoreDocuments(req, res, db);
  }
}

async function getMoreDocuments(req, res, db) {
  const body = JSON.parse(req.body);
  console.log('hi', 'hi');
  const expectedFields = ['filters','lastItemId','lastItemTime']
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }
  try {
    const content = await getContent(db, body.filters, body.lastItemId, body.lastItemTime);
    console.log('hi', content);
    return res.status(200).json({
      message: content,
      success: true
    });
  } catch (err) {
    return res.status(500).end();
  }


}

