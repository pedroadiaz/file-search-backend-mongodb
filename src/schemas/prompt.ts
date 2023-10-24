import { BaseModel } from "./baseModel";
import { Schema, model } from "mongoose";

export interface IPrompt extends BaseModel {
    prompt: string
    classId: object;
}


export const PromptSchema = new Schema<IPrompt>(
    {
        prompt: { type: String, required: true },
        active: { type: Boolean, required: true },
        classId: { type: Schema.Types.ObjectId, ref: 'classes'}
    },
    {
        timestamps: true
    }
)

const Prompt = model("prompts", PromptSchema);