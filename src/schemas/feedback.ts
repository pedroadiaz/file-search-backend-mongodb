import { BaseModel } from "./baseModel";
import { Schema, model } from "mongoose";

export interface IFeedback extends BaseModel {
    email: string;
    feedback: string;
}

export const FeedbackSchema = new Schema<IFeedback>(
    {
        email: { type: String, required: true },
        feedback: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const FeedBack = model("feedback", FeedbackSchema);