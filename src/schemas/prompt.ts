import { BaseModel } from "./baseModel";

export interface IPrompt extends BaseModel {
    prompt: string
    classId: string;
}