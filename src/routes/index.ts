import express, { Request, Response } from "express";
const router=express.Router();
router.get("/api", (req:Request, res:Response) => {
    res.send("api working succesful!");
  });
  export default  router