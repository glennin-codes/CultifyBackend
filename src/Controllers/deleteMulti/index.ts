import { NextFunction, Request, Response } from "express";
import User from "../../models/User.js";

export const deleteMulti = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Delete all users where isVerified is false
        const result = await User.deleteMany({ isVerified: false });
        console.log('Users successfully deleted:', result.deletedCount);
        res.status(200).send('Users successfully deleted.');
    } catch (error) {
        next(error);
    }
};
