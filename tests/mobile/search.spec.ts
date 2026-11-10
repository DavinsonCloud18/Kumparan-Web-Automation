import { test, expect } from '../../fixtures/BaseTest';
import { Homepage } from '../../pages/Homepage';
import { SearchPageMobile } from '../../pages/mobile/SearchPageMobile';

test.beforeEach('Mengakses homepage', async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.goto('mobile');

    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE! + '/');
});

test('Mencari Artikel dengan valid Keyword', { tag: ['@SRC-001', '@High'] }, async ({ page }) => {
    const searchPage = new SearchPageMobile(page);
    const keyword = 'jakarta';

    await searchPage.imgBtnSearch.tap();
    await searchPage.fillSearch(keyword);

    await expect(searchPage.getSuggestionItem(keyword).first()).toBeVisible();
    await searchPage.doSearch();

    await expect(page).toHaveURL(new RegExp(`/search/${keyword}`));
    await expect(searchPage.getArticleResult(keyword).first()).toBeVisible();
});

test('Verifikasi menghapus kata kunci pencarian dengan tombol clear', { tag: ['@SRC-002', '@Low'] }, async ({ page }) => {
    const searchPage = new SearchPageMobile(page);
    const keyword = 'jakarta';

    await searchPage.imgBtnSearch.tap();
    await searchPage.fillSearch(keyword);
    await searchPage.doSearch();

    await expect(page).toHaveURL(new RegExp(`/search/${keyword}`));
    await searchPage.clearSearch();

    await expect(searchPage.inputSearch).toHaveValue('');
    await expect(searchPage.beforeSearchTitle).toBeVisible();
});

test('Mencari artikel dengan kata kunci simbol-simbol', { tag: ['@SRC-003', '@Low'] }, async ({ page }) => {
    const searchPage = new SearchPageMobile(page);
    const keyword = '$%^&*';

    await searchPage.imgBtnSearch.tap();
    await searchPage.fillSearch(keyword);
    await searchPage.doSearch();

    await expect(searchPage.getArticleResult(keyword).first()).toBeVisible();
});
