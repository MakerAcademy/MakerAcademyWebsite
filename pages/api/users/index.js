import {
  getAllUsers,
  getUserProfileById,
  updateUserProfile,
} from "lib/db/user";
import validateJSON from "lib/db/utils";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/db/connect";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const _id = req.query._id;
  const getUsers = req.query.getAllUsers === "true";

  const updateProfile = req.query.updateProfile === "true";

  switch (req.method) {
    case "GET":
      if (_id) {
        return await fetchUserProfileById(req, res, db, _id);
      } else if (getUsers) {
        return await fetchAllUsers(req, res, db);
      }
    case "POST":
      if (updateProfile) {
        return await updateAUserProfile(req, res, db, _id);
      }
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

async function updateAUserProfile(req, res, db, _id) {
  const body = req.body;
  const expectedFields = [];
  if (!validateJSON(body, expectedFields)) {
    return res.status(400).end();
  }

  body._id = ObjectId(body._id || _id);
  body.trustLevel = parseInt(body.trustLevel || 1);

  try {
    const updated = await updateUserProfile(db, _id, body);

    return res.status(200).json({
      _id: updated,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
