import { test, expect } from '../../fixtures/BaseTest';
import { HomepageMobile } from '../../pages/mobile/HomepageMobile';
import { TeknoPageMobile } from '../../pages/mobile/channel/TeknoPageMobile';
import { BreakingNewsPage } from '../../pages/highligted/BreakingNewsPage';
import { TrendingPageMobile } from '../../pages/mobile/highligted/TrendingPageMobile';
import { NotFoundPage } from '../../pages/NotFoundPage';


test.beforeEach("go to homepage", async ({ page }) => {
    const homepage = new HomepageMobile(page)
    await homepage.goto("mobile");
});

test('Bisa berpindah page artikel melalui channel navigation', { tag: ['@NAV-001', '@Medium'] }, async ({ page }) => {
    const homepage = new HomepageMobile(page);
    const teknoPage = new TeknoPageMobile(page);

    await homepage.btnChannelTekno.tap();
    await expect(teknoPage.titlePage).toBeVisible();
    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE! + '/channel/tekno');

});

test('Bisa berpindah page melalui kumparan highlighed article', { tag: ['@NAV-002', '@Medium'] }, async ({ page }) => {
    const homepage = new HomepageMobile(page);
    const breakingNewsPage = new BreakingNewsPage(page);

    await homepage.btnHighligtedBreakingNews.tap();
    await expect(breakingNewsPage.titlePage).toBeVisible();
    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE! + '/breakingnews');

});

test('Bisa berpindah page dengan valid URL', { tag: ['@NAV-003', '@Medium'] }, async ({ page }) => {
    const trendingPage = new TrendingPageMobile(page);

    await page.goto(process.env.BASE_URL_MOBILE! + '/trending');
    await expect(trendingPage.trendingArticle).toBeVisible();
    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE! + '/trending');

});

test('Verifikasi berpindah page dengan invalid URL', { tag: ['@NAV-004', '@Medium'] }, async ({ page }) => {
    const notFoundPage = new NotFoundPage(page);

    await page.goto(process.env.BASE_URL_MOBILE! + '/trendingssds');
    await expect(notFoundPage.messageNotFoundPage).toBeVisible();
    await expect(notFoundPage.btnLihatKontenLain).toBeVisible();

});