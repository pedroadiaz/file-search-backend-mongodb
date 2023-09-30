import { BookSchema, IBook } from "@schemas/book";
import { AbstractRepo } from "./abstract.repo";

export class BookRepo extends AbstractRepo<IBook> {
    constructor() {
        super("Books", BookSchema)
    }
}