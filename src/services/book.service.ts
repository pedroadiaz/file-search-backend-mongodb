import { BookRepo } from "@repos/book.repo";
import { IBook } from "@schemas/book";
import { AbstractService } from "./abstract.service";

export class BookService extends AbstractService<IBook> {
    constructor() {
        const repo = new BookRepo();

        super(repo);
    }
}