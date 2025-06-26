import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"
// authoption ini untuk initialisasi authentikasi
export const authOptions: NextAuthOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
      params: {},
    },
    checks:['none']
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout"
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      }
    },
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15
      }
    }
  },
  callbacks: {
    async session({ session, token:_token }) {
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
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
}
export default NextAuth(authOptions)