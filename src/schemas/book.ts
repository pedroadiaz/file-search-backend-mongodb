import { Schema, model } from "mongoose";
import { BaseModel } from "./baseModel";

export interface IBook extends BaseModel {
    bookName: string;
    classId: string;
}

export const BookSchema = new Schema<IBook>(
    {
        classId: { type: String, required: true },
        bookName: { type: String, required: true },
        active: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)

const Prompt = model("books", BookSchema);