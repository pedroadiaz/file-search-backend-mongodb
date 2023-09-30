import { BaseModel } from "./baseModel";
import mongoose from "mongoose";

export interface IUser extends BaseModel {
    email: string;
    firstName: string;
    lastName: string;
    paid: boolean;
    nextPayDate: Date;
    isAdmin: boolean;
}

export const UserSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        paid: { type: Boolean },
        nextPayDate: { type: Date },
        isAdmin: { type: Boolean },
        active: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)