import { NextFunction, Request, Response } from "express";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

export const verifyingUserCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { email, code, expirationTimestamp } = req.body;
  if (!email || !code || !expirationTimestamp) {
    return res
      .status(400)
      .json({ error: "Missing required parameters in the query" });
  }
  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: "missing code" });
}

  console.log({email,code,expirationTimestamp});


  const expTime = parseInt(expirationTimestamp as string, 10);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Its look like the user is not in our database " });
    } else if (user.verificationCode !== code) {
      return res.status(400).json({ error: "Invalid verification code" });
    } else if (Date.now() > expTime) {
      return res
        .status(400)
        .json({ error: "verification has expired kindly retry" });
    } else {
      user.isVerified = true;
      user.verificationCode = "nulified";
      await user.save();
      const name:string=`${user.firstName} ${user.lastName}`;
      const token = jwt.sign(
        { userId: user.id , email,name },
        process.env.JWT_SECRET || '',
        { expiresIn: '1h' }
      );

     

      return res
        .status(200)
        .json({ id: user.id,name,role:user.role, message: "Verification was  successful",token });
    }
  } catch (error) {
    next(error);
  }
};