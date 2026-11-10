import { Page, Locator } from '@playwright/test';

export class TrendingPage {
    readonly page: Page;
    readonly titlePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.getByRole('heading', { name: 'Trending', level: 1 });
    }
}
