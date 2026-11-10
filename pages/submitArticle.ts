import { Page, Locator } from '@playwright/test';

export class SubmitArticlePage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly contentInput: Locator;
    readonly publishButton: Locator;
    readonly article: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.locator('#title');
        this.contentInput = page.locator('#content');
        this.publishButton = page.locator('#publish');
        this.article = page.locator('#article');
    }

    async fillTitle(title: string) {
        await this.titleInput.fill(title);
    }

    async fillContent(content: string) {
        await this.contentInput.fill(content);
    }

    async clickPublish() {
        await this.publishButton.click();
    }

    async createArticle(title: string, content: string) {
        await this.fillTitle(title);
        await this.fillContent(content);
        await this.clickPublish();
    }
}
