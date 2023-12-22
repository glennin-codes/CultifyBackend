import { Request, Response } from "express";
import User from "../../models/User.js";

// Get all users
export const getAllUsers = async (req:Request, res:Response) => {
  
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error ' });
  }
};