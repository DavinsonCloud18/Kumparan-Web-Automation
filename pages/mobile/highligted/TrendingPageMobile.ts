import { Page, Locator } from '@playwright/test';

export class TrendingPageMobile {
    readonly page: Page;
    readonly titlePage: Locator;
    readonly trendingArticle: Locator;


    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.getByRole('heading', { name: 'Trending di Tekno', level: 2 });
        this.trendingArticle = page.getByLabel('news-card-label-link').first();
    }
}
