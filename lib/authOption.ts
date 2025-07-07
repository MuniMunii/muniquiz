import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./mongoClient";
// authoption ini untuk mengatur opsi autentikasi dan dipanggil jika dibutuhkan / digunakan
// component yang membutuhkan autentikasi/role
// pake useSession untuk client dan getServerSession untuk server
/* eslint-disable @typescript-eslint/no-unused-vars */
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async session({ session, token }) {
      session.someCookie = token.someCookie as string;
      const db = (await clientPromise).db("muniquiz");
      const user = await db
        .collection("users")
        .findOne({ email: session.user.email });
      if (user?.role) session.user.role = user.role;
      if (user?._id) session.user.id = user._id.toString();
      if (user?.username)session.user.username=user.username
      return session;
    },
    async jwt({ token, account: _account }) {
      return token;
    },
  },
};
