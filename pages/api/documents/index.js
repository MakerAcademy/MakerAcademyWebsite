import {
  acceptEdit,
  addToContentLikes,
  rejectEdit,
  removeFromContentLikes,
} from "lib/db/content";
import { ObjectId } from "mongodb";
import { connectToDB } from "../../../lib/db/connect";
import {
  getOneDocument,
  createDocument,
  addToContent,
  getUserDocuments,
  addToContentDraft,
  getUserEditSubmissions,
} from "../../../lib/db/document";
import validateJSON from "../../../lib/db/utils";

export default async function handler(req, res) {
  const _id = req.query._id;
  const uid = req.query.uid;
  const like = req.query.like;
  const getSubmissions = req.query.getSubmissions === "true";
  const acceptSubmission = req.query.acceptSubmission === "true";
  const rejectSubmission = req.query.rejectSubmission === "true";

  const { db } = await connectToDB();

  switch (req.method) {
    case "GET":
      if (uid && getSubmissions) {
        return await fetchEditRequests(req, res, db, uid);
      } else if (_id) {
        return await fetchOneDoc(req, res, db, _id);
      } else if (uid) {
        return await fetchUserDocs(req, res, db, uid);
      }
    case "POST":
      if (acceptSubmission === true) {
        return await acceptEditRequest(req, res, db);
      } else if (rejectSubmission === true) {
        return await rejectEditRequest(req, res, db);
      } else if (like === "true") {
        console.log("Liking");
        return await likeDocument(req, res, db, _id, uid);
      } else if (like === "false") {
        console.log("Unliking");
        return await unlikeDocument(req, res, db, _id, uid);
      } else {
        return await createOneDoc(req, res, db, _id);
      }
  }
}

async function fetchUserDocs(req, res, db, uid) {
  try {
    const docs = await getUserDocuments(db, uid);

    return res.status(200).json({
      message: docs,
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

  const isNewDoc = req.body.status === "published";
  // TODO - complete logic for when its not a new doc

  try {
    const documentStatus = await createDocument(db, body);

    let contentStatus = null;

    if (isNewDoc) {
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

async function likeDocument(req, res, db, _id, uid) {
  if (!_id || !uid) {
    return res.status(400).end();
  }

  try {
    const docs = await addToContentLikes(db, _id, uid);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function unlikeDocument(req, res, db, _id, uid) {
  if (!_id || !uid) {
    return res.status(400).end();
  }

  try {
    const docs = await removeFromContentLikes(db, _id, uid);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function acceptEditRequest(req, res, db) {
  const body = req.body;
  const { publishedId, draftId } = body;

  console.log("IN", body);

  if (!publishedId || !draftId) {
    return res.status(400).end();
  }

  console.log("Accepting", publishedId, draftId);

  try {
    const docs = await acceptEdit(db, publishedId, draftId);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function rejectEditRequest(req, res, db) {
  const body = req.body;
  const { publishedId, draftId } = body;

  if (!publishedId || !draftId) {
    return res.status(400).end();
  }

  console.log("Rejecting", publishedId, draftId);

  try {
    const docs = await rejectEdit(db, publishedId, draftId);
    return res.status(200).json({
      message: docs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
