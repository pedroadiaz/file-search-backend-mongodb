import { BaseModel } from "./baseModel";

export interface ISearchResult extends BaseModel {
    fileName: string;
    pageNumber: number;
    text: string
    promptId: string;
}