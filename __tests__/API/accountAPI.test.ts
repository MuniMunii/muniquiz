/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { createMocks } from "node-mocks-http";
import  APIAuthAccount from "@/pages/api/account/auth-account";
import APIAddAccount from "@/pages/api/account/add-account";
import type { VercelRequest,VercelResponse } from "@vercel/node";
import { getServerSession } from "next-auth";
import type{ NextApiRequest, NextApiResponse } from "next";
jest.mock("lib/mongoClient", () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: jest.fn().mockResolvedValue({
          username: "Muni",
          password: "$2b$10$hashhere",
          email:'muni@gmail.com',
          provider: "credentials",
        }),
      }),
    }),
  }),
}));
// mock next-auth
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));
describe('Auth Account API',()=>{
    it('Login when session is Active will return 403',async()=>{
        (getServerSession as jest.Mock).mockResolvedValue({
            user:{name:'Muni'}
        })
        const {req,res}=createMocks({
            method:'POST',
            body:{username:"Muni",password:'12344'}
        })
        const typedReq = req as unknown as VercelRequest;
        const typedRes = res as unknown as VercelResponse;
        await APIAuthAccount(typedReq,typedRes)
        expect(res._getStatusCode()).toBe(403);
        expect(JSON.parse(res._getData()).messages).toBe(
        "Already authentication, Logout first if want change account"
        );
    })
    it('Reject creating account when already exist',async ()=>{
        const {req,res}=createMocks({
            method:"POST",
            body:{username:'Muni',password:'1234567',email:'muni@gmail.com'}
        })
        const typedReq = req as unknown as NextApiRequest;
        const typedRes = res as unknown as NextApiResponse;
        await APIAddAccount(typedReq,typedRes)
        expect(res._getStatusCode()).toBe(409)
        expect(JSON.parse(res._getData()).message).toBe("Account with this Username/Email is already exist")
    })
})