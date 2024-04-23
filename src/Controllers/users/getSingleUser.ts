import { Request, Response } from "express";
import User from "../../models/User.js";

// Get single user by ID or email
const getSingleUser = async (req:Request, res:Response) => {
  const idOrEmail = req.params.id;
  try{
    let user;

    // Check if the parameter is a valid email address
    if (/^\S+@\S+\.\S+$/.test(idOrEmail)) {
      user = await User.findOne({ email: idOrEmail });
    } else {
      user = await User.findById(idOrEmail);
    }
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }

  } catch(error:any){
    console.error(error);
    res.status(500).json({ error: error.message });

  }
 
};
  
export default getSingleUser;