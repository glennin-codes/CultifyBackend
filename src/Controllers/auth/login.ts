
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../../models/User.js';
import { Types } from 'mongoose';

const generateAuthToken = (userId:Types.ObjectId, email: string,name: string) => {
  return jwt.sign(
    { userId: userId, email: email,name:name },
    process.env.JWT_SECRET || '',
    { expiresIn: '1h' }
  );
};

export const loginUser = async (req:Request, res:Response) => {
  try {
    if (req.body.googleId) {
      // Signing in with Google

      const user = await User.findOne({ email:req.body.email, signupMethod: 'google' });

      if (user) {
        const name:string =`${user.firstName} ${user.lastName}`
        const token = generateAuthToken(user._id, user.email,name );
        return res.status(200).json({ token, id: user._id });
      } else {
        return res.status(404).json({ error: 'Invalid email or password' });
      }
    } else {
      // Manual Sign-in
      const { email, password } = req.body;
      const user = await User.findOne({ email,signupMethod: 'manual' });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      if (!user.isVerified) {
        return res.status(401).json({ error: 'Your email is not verified on our systems,Please verify your email before logging in' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
const name:string=`${user.firstName} ${user.lastName}`;
      const token = generateAuthToken(user._id, user.email,name);

      res.status(200).json({ token,id:user._id,name,role:user.role});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};