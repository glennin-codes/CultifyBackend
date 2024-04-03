import { NextFunction, Request, Response } from "express";
import User from "../../models/User.js";

export const Annalys= async (req: Request, res: Response,next:NextFunction) => {
    try {
      // Fetch all users with their predictions
      const users = await User.find().populate('predictions');
  
      // Aggregate and count occurrences of each disease for each month
      const analysisData: Record<string, Record<string, number>> = {};
  
      users.forEach((user) => {
        user.predictions.forEach((prediction) => {
            const monthYear = prediction.predictedTime.toISOString().slice(0, 7);
            // Extract month and year
          if (!analysisData[monthYear]) {
            analysisData[monthYear] = {};
          }
          analysisData[monthYear][prediction.diseaseName] = (analysisData[monthYear][prediction.diseaseName] || 0) + 1;
        });
      });
  
      // Return the aggregated analysis data
      res.status(200).json(analysisData);
    } catch (error) {
      console.error('Error fetching disease analysis data:', error);
     next(error);

    }
  }
  