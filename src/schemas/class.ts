import { BaseModel } from "./baseModel";
import { IBook } from "./book";
import { IShareClass } from "./shareClass";
import mongoose from "mongoose";

export interface IClass extends BaseModel {
    className: string
    userId: string;
    books?: IBook[];
    shared?: IShareClass[];
}

export const ClassSchema = new mongoose.Schema<IClass>(
    {
        userId: { type: String, required: true },
        className: { type: String, required: true },
        active: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)