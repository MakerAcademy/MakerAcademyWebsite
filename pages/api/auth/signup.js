import { connectToDB } from "../../../lib/db/connect";
import { getUserByEmail } from "../../../lib/db/user";
import { hashPassword } from "../../../lib/auth/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, role } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const { db } = await connectToDB();

  const existingUser = await getUserByEmail(db, email);

  const defaultUsername = email.split("@")[0];
  console.log(defaultUsername);

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    image: "",
    emailVerified: null,
  });

  const profileResult = await db.collection("user_profile").insertOne({
    _id: result._id,
    image: "",
    trustLevel: 1,
    walletAddress: "",
    content: [],
    email: email,
    username: defaultUsername,
  });

  res.status(201).json({ message: "Created user!" });
}

export default handler;
