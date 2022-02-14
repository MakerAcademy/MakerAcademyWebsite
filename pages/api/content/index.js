import { connectToDB } from "../../../db/connect";
import { getContent } from "../../../db/content";
import validateJSON from "../../../db/utils";

export default async function handler(req, res) {
  const {db} = await connectToDB();
  switch (req.method) {
    case "GET":
      return await fetchMoreContent(req, res, db);
    case "POST":
      return await fetchMoreContent(req, res, db);
  }
}

async function fetchMoreContent(req, res, db) {
  const body = req.body
  const expectedFields = ['filters','lastItemTime']
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }
  let filters = {}
  const f = body.filters
  if (f.length > 0) {
    filters = {
      $and: f.map((f) => f.value)
    }
  }
  try {
    const content = await getContent(db, filters, body.lastItemTime);
    return res.status(200).json({
      message: content,
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}