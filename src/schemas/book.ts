import mongoose from "mongoose";
import { BaseModel } from "./baseModel";

export interface IBook extends BaseModel {
    bookName: string;
    classId: string;
}

export const BookSchema = new mongoose.Schema<IBook>(
    {
        classId: { type: String, required: true },
        bookName: { type: String, required: true },
        active: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)