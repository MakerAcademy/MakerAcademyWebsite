import { verifyPassword } from "../auth/auth";
import { ObjectId } from "mongodb";

export const getUserIDByEmail = async (db, email) => {
  return db
    .collection("users")
    .findOne({ email: email })
    .projection({ _id: 1 });
};

export const getUserByEmail = async (db, email) => {
  console.log("fetching user");
  return db.collection("users").findOne({ email: email });
};

export const AuthenticateUser = async (db, credentials) => {
  const user = await db
    .collection("users")
    .findOne({ email: credentials.email });
  if (!user) {
    return false;
  }
  if (verifyPassword(credentials.password, user.password)) {
    delete user.password;
    return user;
  }
  return false;
};

export const addContentToLiked = async (db, contentId, userId) => {
  const contentSlug = ObjectId(contentId);
  const userSlug = ObjectId(userId);
  return db
    .collection("user_profile")
    .updateOne(
      { _id: userSlug, liked: { $all: [contentSlug] } },
      { $addToSet: { liked: contentSlug } }
    );
};

export const removeContentFromLiked = async (db, contentId, userId) => {
  const contentSlug = ObjectId(contentId);
  const userSlug = ObjectId(userId);
  return db
    .collection("user_profile")
    .updateOne(
      { _id: userSlug, liked: { $all: [contentSlug] } },
      { $pull: { liked: contentSlug } }
    );
};
