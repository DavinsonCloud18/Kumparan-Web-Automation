import { test, expect } from '@playwright/test';
import { Homepage } from '../../pages/Homepage';
import { SearchPage } from '../../pages/SearchPage';

test.beforeEach('Mengakses homepage', async ({ page }) => {

    const homepage = new Homepage(page);
    await homepage.goto('desktop');

    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP! + '/');
});

test('Mencari Artikel dengan valid Keyword', { tag: ['@SRC-001', '@High'] }, async ({ page }) => {
    const searchPage = new SearchPage(page);
    const keyword = 'jakarta';

    await searchPage.fillSearch(keyword);

    await expect(searchPage.getSuggestionItem(keyword).first()).toBeVisible();
    await searchPage.doSearch();

    await expect(page).toHaveURL(new RegExp(`/search/${keyword}`));
    await expect(searchPage.titlePage).toBeVisible();
    await expect(searchPage.getArticleResult(keyword).first()).toBeVisible();
});

test('Verifikasi menghapus kata kunci pencarian dengan tombol clear', { tag: ['@SRC-002', '@Low'] }, async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.inputSearch.fill('teknologi');
    await searchPage.doSearch();

    await expect(searchPage.titlePage).toBeVisible();

    await searchPage.clearSearch();

    await expect(searchPage.inputSearch).toHaveValue('');
    await expect(searchPage.beforeSearchTitle).toBeVisible();
});

test('Mencari artikel dengan kata kunci simbol-simbol', { tag: ['@SRC-003', '@Low'] }, async ({ page }) => {
    const searchPage = new SearchPage(page);
    const keyword = '$%^&*';

    await searchPage.fillSearch(keyword);
    await searchPage.doSearch();

    await expect(searchPage.titlePage).toBeVisible();
    await expect(searchPage.getArticleResult(keyword).first()).toBeVisible();
});
