

import { Request, Response } from "express";

import User from "../../models/User.js";

// Delete user by ID
const deleteUser = async (req:Request, res:Response) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const deletedUser = await User.findOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

  
     // Delete the user from the database
     await User.deleteOne({ _id: id });

    res.status(200).json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default deleteUser;