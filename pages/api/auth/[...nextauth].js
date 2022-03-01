import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDB } from "../../../lib/db/connect";
import GoogleProvider from "next-auth/providers/google";
import { AuthenticateUser, getUserByEmail } from "../../../lib/db/user";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { db } = await connectToDB();
        const authenticated = await AuthenticateUser(db, credentials);
        console.log("Authentication Status: ", authenticated);
        if (authenticated) {
          console.log("SUCCESSFUL AUTHENTICATION");
          console.log(authenticated);
          return { email: authenticated.email };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  adapter: MongoDBAdapter(connectToDB().then((response) => response.dbClient)),
  callbacks: {
    async session(session, token) {
      const { db } = await connectToDB();

      const email = session?.session?.user?.email;

      // TODO - change to user_profile db instead of user db
      const userData = await getUserByEmail(db, email);

      session.profile = { ...session.user, ...(userData || {}) };

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
