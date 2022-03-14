import { verifyPassword } from "../auth/auth";
import { ObjectId } from "mongodb";

export const getAllUsers = async (db) => {
  return db.collection("user_profile").find().toArray();
};

export const getUserIDByEmail = async (db, email) => {
  return db
    .collection("users")
    .findOne({ email: email })
    .projection({ _id: 1 });
};

export const getUserProfileById = async (db, id) => {
  const _id = ObjectId(id);

  return db.collection("user_profile").findOne({ _id });
};

export const getUserByEmail = async (db, email) => {
  console.log("fetching user");
  const user = await db.collection("users").findOne({ email: email });

  if (!user) {
    return user;
  }

  const defaultUsername = user.email.split("@")[0];

  const user_profile = await db
    .collection("user_profile")
    .findOne({ _id: user._id });

  if (user_profile === null) {
    const profileResult = await db.collection("user_profile").insertOne({
      _id: user._id,
      image: "",
      trustLevel: 1,
      walletAddress: "",
      content: [],
      email: user.email,
      username: defaultUsername,
    });
  }
  return user;
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

export const updateUserProfile = async (db, uid, data) => {
  const _id = ObjectId(uid);

  return db
    .collection("user_profile")
    .updateOne({ _id }, { $set: { ...data } });
};
