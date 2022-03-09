import { getAllUsers, getUserProfileById } from "lib/db/user";
import clientPromise from "../../../lib/db/connect";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const _id = req.query._id;
  const getUsers = req.query.getAllUsers === "true";

  switch (req.method) {
    case "GET":
      if (_id) {
        return await fetchUserProfileById(req, res, db, _id);
      } else if (getUsers) {
        return await fetchAllUsers(req, res, db);
      }
    case "POST":
      //   return await fetchAllUsers(req, res, db);
      break;
  }
}

async function fetchAllUsers(req, res, db) {
  try {
    const docs = await getAllUsers(db);

    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function fetchUserProfileById(req, res, db, _id) {
  try {
    const docs = await getUserProfileById(db, _id);

    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
