import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter} from "@next-auth/mongodb-adapter";
import { connectToDB } from "../../../lib/db/connect";
import { getUserByEmail } from "../../../lib/db/user";
import { verifyPassword } from "../../../lib/auth/auth";

const {db, dbClient} = connectToDB();

export default NextAuth({
  session: {
    strategy: 'database'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    })
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "email", type: "text", placeholder: "johndoe@example.com" },
    //     password: {  label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     const payload = {
    //       email: credentials.email,
    //       password: credentials.password
    //     }
    //     console.log("T:WLKJR:WLEKJ:LKSJDF");
    //     const response = await fetch('/api/auth/signin', {
    //       method: 'POST',
    //       body: JSON.stringify(payload),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     const user = await response.json();
    //     if (response.status !== 200) {
    //       throw new Error(user.message)
    //     }
    //     return user
    //   },
    // })
  ],
  pages: {
    signIn: '/',
  },
  adapter: MongoDBAdapter(dbClient),
})