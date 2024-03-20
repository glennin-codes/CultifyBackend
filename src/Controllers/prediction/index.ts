import { NextFunction, Request, Response } from "express";
import User from "../../models/User.js";

export const Prediction=async(req:Request,res:Response,next:NextFunction)=>{
 try {
    const  {diseaseName }=req.body;
    const {id}=req.params;
    console.log(id)
  
    const user=await User.findById(id)
    if( user){
       user.predictions.push({
           diseaseName,
           predictedTime:new Date()
       });
       user.save();
       res.status(200).send({
        message:"saved successfuly"
       })

    }else{
        res.status(404).json({error:"user not found"})
    }
 
 } catch (error) {
    next(error)
 }
}