import { Page, Locator } from '@playwright/test';
import { pageNotFound } from '../test-data/errorMessage';

export class NotFoundPage {
    readonly page: Page;
    readonly messageNotFoundPage: Locator;
    readonly btnLihatKontenLain: Locator;

    constructor(page: Page) {
        this.page = page;
        this.messageNotFoundPage = page.getByText(pageNotFound.message);
        this.btnLihatKontenLain = page.getByText(pageNotFound.buttonText);
    }
}
