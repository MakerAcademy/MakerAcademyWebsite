import {
  acceptEdit,
  acceptPending,
  addToContentLikes,
  getAdminContent,
  rejectEdit,
  rejectPending,
  removeFromContentLikes,
} from "lib/db/content";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/db/connect";
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
  const getPublishedDocs = req.query.getPublishedDocs === "true";
  const getPendingDocs = req.query.getPendingDocs === "true";
  const acceptSubmission = req.query.acceptSubmission === "true";
  const rejectSubmission = req.query.rejectSubmission === "true";
  const acceptPendingDoc = req.query.acceptPendingDoc === "true";
  const rejectPendingDoc = req.query.rejectPendingDoc === "true";

  const client = await clientPromise;
  const db = client.db();

  switch (req.method) {
    case "GET":
      if (getPublishedDocs) {
        return await fetchPublishedDocs(req, res, db);
      } else if (getPendingDocs) {
        return await fetchPendingDocs(req, res, db);
      } else if (uid && getSubmissions) {
        return await fetchEditRequests(req, res, db, uid);
      } else if (_id) {
        return await fetchOneDoc(req, res, db, _id);
      } else if (uid) {
        return await fetchUserDocs(req, res, db, uid);
      }
    case "POST":
      if (acceptPendingDoc) {
        return await acceptPendingRequest(req, res, db, _id);
      } else if (rejectPendingDoc) {
        return await rejectPendingRequest(req, res, db, _id);
      } else if (acceptSubmission) {
        return await acceptEditRequest(req, res, db);
      } else if (rejectSubmission) {
        return await rejectEditRequest(req, res, db);
      } else if (like === "true") {
        return await likeDocument(req, res, db, _id, uid);
      } else if (like === "false") {
        return await unlikeDocument(req, res, db, _id, uid);
      } else {
        return await createOneDoc(req, res, db, _id);
      }
  }
}

async function fetchPublishedDocs(req, res, db) {
  try {
    const docs = await getAdminContent(db);

    return res.status(200).json({
      message: docs?.published || [],
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function fetchPendingDocs(req, res, db) {
  try {
    const docs = await getAdminContent(db);

    return res.status(200).json({
      message: docs?.pending || [],
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
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

  const isNewDoc = req.body.status === "pending";

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

async function acceptPendingRequest(req, res, db, _id) {
  if (!_id) {
    return res.status(400).end();
  }

  try {
    const _res = await acceptPending(db, _id);
    return res.status(200).json({
      message: _res,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

async function rejectPendingRequest(req, res, db, _id) {
  if (!_id) {
    return res.status(400).end();
  }

  try {
    const _res = await rejectPending(db, _id);
    return res.status(200).json({
      message: _res,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
