import { PromptRepo } from "@repos/prompt.repo";
import { IPrompt } from "@schemas/prompt";
import { AbstractService } from "./abstract.service";

export class PromptService extends AbstractService<IPrompt> {
    constructor() {
        const repo = new PromptRepo();

        super(repo);
    }
}