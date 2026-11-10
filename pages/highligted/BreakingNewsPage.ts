import { Page, Locator } from '@playwright/test';

export class BreakingNewsPage {
    readonly page: Page;
    readonly titlePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.getByText("Breaking News Sebelumnya");
    }
}
