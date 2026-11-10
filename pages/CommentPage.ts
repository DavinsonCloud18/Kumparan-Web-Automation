import { Page, Locator } from "@playwright/test";

export class CommentPage {
    readonly page: Page;
    readonly commentArea: Locator;
    readonly btnSendComment: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentArea = page.getByPlaceholder('Tulis komentar...');
        this.btnSendComment = page.locator('button[id="track_submit_comment"]');
    }

    async fillComment(comment: string) {
        this.commentArea.fill(comment);
    }
}