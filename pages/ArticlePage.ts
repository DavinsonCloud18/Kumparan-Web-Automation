import { Page, Locator } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly channel: Locator;
    readonly breadcrumb: Locator;
    readonly articleTitle: Locator;
    readonly comment: Locator;
    readonly commentBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.channel = page.getByLabel('kumparan logo').first().locator('a');
        this.breadcrumb = page.locator("nav ul li").first();
        this.articleTitle = page.locator('article').getByRole('heading', { level: 1 });
        this.comment = page.locator('//img[@alt="comment"]/ancestor::a');
        this.commentBtn = page.locator("img[alt='comment']");

    }

}