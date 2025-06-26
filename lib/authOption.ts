import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
// authoption ini untuk mengatur opsi autentikasi dan dipanggil jika dibutuhkan / digunakan
// component yang membutuhkan autentikasi/role
// pake useSession untuk client dan getServerSession untuk server
export const authOptions:AuthOptions= {
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
      return session;
    },
    async jwt({ token, account:_account }) {
      return token;
    },
  },
};