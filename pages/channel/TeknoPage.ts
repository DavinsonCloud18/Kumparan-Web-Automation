import { Locator, Page } from "@playwright/test";

export class TeknoPage {
    readonly page: Page;
    readonly btnChannelTekno: Locator;
    readonly titlePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnChannelTekno = page.locator('a[href="/channel/tekno"]');
        this.titlePage = page.getByRole('heading', { name: 'Tekno', level: 1 })
    }
}