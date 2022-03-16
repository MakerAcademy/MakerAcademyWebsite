import { getUserContent, getUserEditSubmissions } from "lib/db/content";
import clientPromise from "../../../lib/db/connect";
import { getContent } from "../../../lib/db/content";
import validateJSON from "../../../lib/db/utils";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const uid = req.query.uid;
  const getSubmissions = req.query.getSubmissions === "true";

  switch (req.method) {
    case "GET":
      if (uid && getSubmissions) {
        return await fetchEditRequests(req, res, db, uid);
      } else if (uid) {
        return await fetchUserContent(req, res, db, uid);
      }
      return await fetchMoreContent(req, res, db);
    case "POST":
      return await fetchMoreContent(req, res, db);
  }
}

async function fetchMoreContent(req, res, db) {
  const body = req.body;
  const expectedFields = ["filters", "lastItemTime"];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }
  let filters = {};
  const f = body.filters;
  if (f.length > 0) {
    filters = {
      $and: f.map((f) => f.value),
    };
  }
  try {
    const content = await getContent(db, filters, body.lastItemTime);
    return res.status(200).json({
      message: content,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function fetchEditRequests(req, res, db, uid) {
  try {
    const docs = await getUserEditSubmissions(db, uid);

    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function fetchUserContent(req, res, db, uid) {
  if (!uid) return res.status(500).end();

  try {
    const docs = await getUserContent(db, uid);

    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
