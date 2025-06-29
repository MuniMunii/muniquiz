import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongoClient";
import { UserSchema } from "../../../../lib/validation/user";
// authoption ini untuk initialisasi authentikasi
/* eslint-disable @typescript-eslint/no-unused-vars */
export const authOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {},
      },
      checks: ["none"],
    }),
  ],
  adapter: MongoDBAdapter(clientPromise,{databaseName:'muniquiz'}),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  events: {
    async createUser({ user }) {
      const db = (await clientPromise).db();
      const userExist = await db
        .collection("users")
        .findOne({ email: user.email });
      const parseUser = UserSchema.safeParse(userExist);
      if (!parseUser.data?.role) {
        await db
          .collection("users")
          .updateOne({ email: user.email }, { $set: { role: "user" } });
      }
    },
  },
  callbacks: {
    async signIn({ user }) {
      const db = (await clientPromise).db();
      const collectionUsers = db.collection("users");
      const userExist = await collectionUsers.findOne({ email: user.email });
      const parseUser = UserSchema.safeParse(userExist);
      if (!parseUser.success) {
        console.log("User Validation Error ", parseUser.error);
      }
      const parsedUser = parseUser.data;
      if (!parsedUser?.role) {
        await collectionUsers.updateOne(
          { email: user.email },
          { $set: { role: "user" } }
        );
      }
      return true;
    },

    async session({ session, token: _token }) {
      const db = (await clientPromise).db();
      const user = await db
        .collection("users")
        .findOne({ email: session.user.email });
      if (user?.role) {
        session.user.role = user.role;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  // Debugging
  // events: {
  //   async signIn(message) {
  //     console.log('Sign in event:', message)
  //   },
  //   async signOut(message) {
  //     console.log('Sign out event:', message)
  //   },
  //   async createUser(message) {
  //     console.log('Create user event:', message)
  //   },
  //   async session(message) {
  //     console.log('Session event:', message)
  //   }
  // },
  // logger: {
  //   error(code, metadata) {
  //     console.error('NextAuth Error:', code, metadata)
  //   },
  //   warn(code) {
  //     console.warn('NextAuth Warning:', code)
  //   },
  //   debug(code, metadata) {
  //     console.log('NextAuth Debug:', code, metadata)
  //   }
  // }
};
export default NextAuth(authOptions);
