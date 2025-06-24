import type { Request, Response } from "express";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin:['http://localhost:3000',"https://muniquiz.vercel.app"],
     credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.get("/test", async (_req: Request, res: Response) => {
  try{
    console.log("test")
    res.status(200).json({ message: "Test endpoint is working!" });
  }catch(error){
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(4000,()=>console.log('test server started on port 4000'))
module.exports=app
