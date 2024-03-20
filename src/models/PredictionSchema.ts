import { Schema } from "mongoose";

export interface IPrediction {
 
    diseaseName: string;
    predictedTime: Date;
}

export const predictionSchema = new Schema<IPrediction>({
    diseaseName: { type: String, required: true },
    predictedTime: { type: Date, default: Date.now }
});
