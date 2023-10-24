import { BaseModel } from "./baseModel";
import { IBook } from "./book";
import { Schema, model } from "mongoose";
import { IPrompt } from "./prompt";

export interface IClass extends BaseModel {
    className: string
    userId: string;
    books?: IBook[];
    savedPrompts?: IPrompt[];
}

export const ClassSchema = new Schema<IClass>(
    {
        userId: { type: String, required: true },
        className: { type: String, required: true },
        active: { type: Boolean, required: true },
        books: { type: Schema.Types.ObjectId, ref: "books" },
        savedPrompts: { type: Schema.Types.ObjectId, ref: "prompt" }
    },
    {
        timestamps: true
    }
)

const Prompt = model("classes", ClassSchema);