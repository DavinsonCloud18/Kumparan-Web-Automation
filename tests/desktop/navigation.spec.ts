import { test, expect } from '../../fixtures/BaseTest';
import { Homepage } from '../../pages/Homepage';
import { TeknoPage } from '../../pages/channel/teknoPage';
import { BreakingNewsPage } from '../../pages/highligted/BreakingNewsPage';
import { TrendingPage } from '../../pages/highligted/TrendingPage';
import { NotFoundPage } from '../../pages/NotFoundPage';


test('Bisa berpindah page artikel melalui channel navigation', { tag: ['@NAV-001', '@Medium'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    const teknoPage = new TeknoPage(page);

    await homepage.goto('desktop');
    await homepage.btnChannelTekno.click();
    await expect(teknoPage.titlePage).toBeVisible();
    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP! + '/channel/tekno');

});

test('Bisa berpindah page melalui kumparan highlighed article', { tag: ['@NAV-002', '@Medium'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    const breakingNewsPage = new BreakingNewsPage(page);

    await homepage.goto('desktop');
    await homepage.btnHighligtedBreakingNews.click();
    await expect(breakingNewsPage.titlePage).toBeVisible();
    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP! + '/breakingnews');

});

test('Bisa berpindah page dengan valid URL', { tag: ['@NAV-003', '@Medium'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    const trendingPage = new TrendingPage(page);

    await homepage.goto('desktop');
    await page.goto(process.env.BASE_URL_DESKTOP! + '/trending');
    await expect(trendingPage.titlePage).toBeVisible();
    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP! + '/trending');

});

test('Verifikasi berpindah page dengan invalid URL', { tag: ['@NAV-004', '@Medium'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    const notFoundPage = new NotFoundPage(page);

    await homepage.goto('desktop');
    await page.goto(process.env.BASE_URL_DESKTOP! + '/trendingssds');
    await expect(notFoundPage.messageNotFoundPage).toBeVisible();
    await expect(notFoundPage.btnLihatKontenLain).toBeVisible();

});