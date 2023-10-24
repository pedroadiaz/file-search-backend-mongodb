import { FeedbackSchema, IFeedback } from "@schemas/feedback";
import { AbstractRepo } from "./abstract.repo";

export class FeedbackRepo extends AbstractRepo<IFeedback> {
    constructor() {
        super("feedback", FeedbackSchema)
    }
}