import { Locator, Page } from "@playwright/test";

export class SearchPageMobile {
    readonly page: Page;
    readonly inputSearch: Locator;
    readonly btnClearSearch: Locator;
    readonly titlePage: Locator;
    readonly beforeSearchTitle: Locator;
    readonly imgBtnSearch: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inputSearch = page.getByPlaceholder('Cari di sini...');
        this.btnClearSearch = page.getByAltText('x-circle');
        this.titlePage = page.getByRole('heading', { name: 'Hasil Pencarian', level: 1 });
        this.beforeSearchTitle = page.getByText('Pencarian populer');
        this.imgBtnSearch = page.locator('header a[href="/search"]');
    }

    async fillSearch(keyword: string) {
        await this.inputSearch.fill(keyword);
    }
    async doSearch() {
        await this.inputSearch.press('Enter');
    }

    async clearSearch() {
        await this.btnClearSearch.click();
    }

    getSuggestionItem(keyword: string): Locator {
        return this.page.getByRole('button', { name: new RegExp(keyword, 'i') });
    }

    getArticleResult(keyword: string): Locator {
        return this.page.locator('main').getByText(keyword, { exact: false });
    }
}