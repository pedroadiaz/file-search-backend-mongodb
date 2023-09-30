import { BaseModel } from "./baseModel";

export interface IShareClass extends BaseModel {
    email: string
    classId: string;
}