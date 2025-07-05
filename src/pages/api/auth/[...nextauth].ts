import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongoClient";
import CredentialsProvider from "next-auth/providers/credentials";
// authoption ini untuk initialisasi authentikasi
/* eslint-disable @typescript-eslint/no-unused-vars */
export const authOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Jhon" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        console.log("Authorizing with credentials:", credentials);
        const { username, password } = credentials ?? {};
        if (!username || !password) return null;
        const res = await fetch(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.NEXTAUTH_URL
              : "http://localhost:3000"
          }/api/account/auth-account`,
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log(user)
        if (res.ok && user)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
            image: null,
            role: user.role,
          };
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {},
      },
      checks: ["none"],
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, { databaseName: "muniquiz" }),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        // Just verify credentials user exists from signup
        const db = (await clientPromise).db("muniquiz");
        const userExist = await db.collection("users").findOne({
          username: user.name,
        });
        return !!userExist;
      }
      return true;
    },
    async session({ session, token: _token }) {
      const db = (await clientPromise).db("muniquiz");
      // Try to find user by email and any provider
      const user = await db
        .collection("users")
        .findOne({ email: session.user.email });
      if (user?.role) {
        session.user.role = user.role;
      }
      if (user?._id) {
        session.user.id = user._id.toString();
      }
      console.log(session);
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
    events: {
    async createUser({ user }) {
      const db = (await clientPromise).db("muniquiz").collection("users");
      await db.updateOne(
        { email: user.email },
        {
          $set: {
            role: "user",
            createdAt: new Date(),
            username: user.name?.replace(/\s/g, "") || "",
          },
        },{upsert:true}
      );
    }
  },
};
export default NextAuth(authOptions);
