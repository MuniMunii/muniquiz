import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    someCookie?: string;
    user: {
      address: string
      role?:string
      username:string
      id?:string
    } & DefaultSession["user"]
  }
  interface User {
    password?:string
    username?: string;
    role?: string;
    address?: string;
  }
}