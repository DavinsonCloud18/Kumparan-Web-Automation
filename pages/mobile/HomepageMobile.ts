import { Page, Locator } from '@playwright/test';

export class HomepageMobile {
    readonly page: Page;
    readonly btnMasuk: Locator;
    readonly imgProfileAvatar: Locator;
    readonly btnChannelTekno: Locator;
    readonly btnHighligtedBreakingNews: Locator;
    readonly article: Locator;
    readonly articleTitle: Locator;
    readonly closeAds: Locator;
    readonly pollingTitle: Locator;
    readonly pollingBtn: Locator;

    //mobile element
    readonly btnCloseAdsMobile: Locator;
    readonly humburgerMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnMasuk = page.locator('a').getByText('Masuk');
        this.imgProfileAvatar = page.getByAltText('user-profile-avatar');
        this.btnChannelTekno = page.locator('header nav').locator('a[href="/channel/tekno"]');
        this.btnHighligtedBreakingNews = page.locator('li a[href="/breakingnews"] span');
        this.article = page.locator("a[aria-label='news-card-label-link']")
            .filter({ hasNotText: 'Sedang memuat...' })
            .first();
        this.articleTitle = this.article.locator("span").first();
        this.closeAds = this.page.locator("button").getByAltText("close");
        this.pollingTitle = this.page.getByRole('heading', { name: 'polling', level: 2 })
        this.pollingBtn = this.page.locator("ul[role='presentation'] li button").first();
        this.btnCloseAdsMobile = this.page.locator('aside[id="animated-mobile-mega-billboard"]').getByText('TUTUP', { exact: true });
        this.humburgerMenu = this.page.getByAltText('hamburger-menu');
    }

    async goto(platform: string = "desktop") {
        const url = platform === "mobile"
            ? (process.env.BASE_URL_MOBILE || 'https://m.kumparan.com')
            : (process.env.BASE_URL_DESKTOP || 'https://kumparan.com');
        await this.page.goto(url);
    }

    async clickArticle() {
        await this.article.click();
    }

}