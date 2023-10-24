import { FeedbackRepo } from "@repos/feedback.repo";
import { IFeedback } from "@schemas/feedback";
import { AbstractService } from "./abstract.service";

export class FeedbackService extends AbstractService<IFeedback> {
    constructor() {
        const repo = new FeedbackRepo();

        super(repo);
    }
}