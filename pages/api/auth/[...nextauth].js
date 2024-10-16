import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import client from "../../../lib/db";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(client),
  callbacks: {
    async session({ session, token, user }) {
      session.cartLength = user?.cart?.length;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
