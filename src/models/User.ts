
import mongoose, { Document, Schema, SchemaDefinitionProperty } from "mongoose";
import { IPrediction,predictionSchema } from "./PredictionSchema.js";

interface IImage {
    url: string;
    title: string;

}  
export enum Role {
    admin = "admin",
    user = "user"
}

interface Iuser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    location:string;
    createdAt: {
        type: Date;
        default: Date;
    };
    isVerified:boolean;
    verificationCode:string;
    signupMethod:string;
    profilePhoto:IImage;
    predictions:IPrediction[];
    role: Role; 
   
}

const userSchema = new Schema <Iuser>({
    email:{type:String,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,},
    phoneNumber:{type:String,},
    location:{type:String,default:"Nairobi"},
    profilePhoto:{
        url:{type:String},
        title:{type:String},
    },

    createdAt:{type:Date,default:Date.now},
    isVerified:{type:Boolean,default:false},
    verificationCode:{type:String},
    signupMethod:{
        type:String,
        enum:["manual","google"]   
    },
    predictions: [predictionSchema],
    role:{
        type:String,
        enum: Object.values(Role) as string[],
        default:"user"
    } as SchemaDefinitionProperty<Role, Iuser> | undefined
  
    
});
 const User = mongoose.model<Iuser>("Users",userSchema);
 export default User;