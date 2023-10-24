import { PromptSchema, IPrompt } from "@schemas/prompt";
import { AbstractRepo } from "./abstract.repo";

export class PromptRepo extends AbstractRepo<IPrompt> {
    constructor() {
        super("Prompts", PromptSchema)
    }
}