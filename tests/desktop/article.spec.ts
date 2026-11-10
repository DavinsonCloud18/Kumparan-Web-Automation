import { test, expect } from '../../fixtures/BaseTest';
import { Homepage } from '../../pages/Homepage';
import { ArticlePage } from '../../pages/ArticlePage';
import { CommentPage } from '../../pages/commentPage';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach('Mengakses homepage', async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.goto('desktop');

    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP!);

});

test('Bisa melihat detail artikel', { tag: ['@ART-001', '@High'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    const homepageArticleTitle = await homepage.articleTitle.innerText();
    const articleURL = await homepage.article.getAttribute('href');
    const articleHrefHomepage = await homepage.articleTitle.getAttribute('href');

    await expect(homepage.article).toBeVisible();
    await homepage.clickArticle();

    const articlePage = new ArticlePage(page);
    const articlePageTitle = await articlePage.articleTitle.innerText();
    const articleHrefPage = await articlePage.articleTitle.getAttribute('href');

    await page.goto(process.env.BASE_URL_DESKTOP! + articleURL);
    await expect(articlePageTitle).toBe(homepageArticleTitle);
    await expect(articlePage.channel).toBeVisible();
    await expect(articlePage.breadcrumb).toBeVisible();
    await expect(articleHrefHomepage).toBe(articleHrefPage);

});

test('Tidak bisa memberikan comment pada article ketika belum login', { tag: ['@ART-003', '@Medium'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    const homepageArticleTitle = await homepage.articleTitle.innerText();
    const articleURL = await homepage.article.getAttribute('href');

    await expect(homepage.article).toBeVisible();

    // await page.addLocatorHandler(
    //     page.locator('img[alt="close"]'),
    //     async (overlay) => {
    //         await overlay.click();
    //     }
    // );

    await homepage.clickArticle();

    const articlePage = new ArticlePage(page);
    const articlePageTitle = await articlePage.articleTitle.innerText();

    await page.goto(process.env.BASE_URL_DESKTOP! + articleURL);
    await expect(articlePageTitle).toBe(homepageArticleTitle);

    await expect(articlePage.comment).toBeVisible();
    await articlePage.commentBtn.click();

    await page.goto(process.env.BASE_URL_DESKTOP! + await articlePage.comment.getAttribute('href'));
    const commentPage = new CommentPage(page);
    await expect(commentPage.commentArea).toBeVisible();
    await commentPage.fillComment('ini adalah komentar');

    await commentPage.btnSendComment.click();

    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL_DESKTOP! + '/login');
    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP! + "/login")

});

test('Tidak bisa melakukan polling news ketika belum login', { tag: ['@ART-005', '@Low'] }, async ({ page }) => {
    const homepage = new Homepage(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(homepage.pollingTitle).toBeVisible();

    await expect(homepage.pollingBtn).toBeVisible();
    await homepage.pollingBtn.click();

    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL_DESKTOP! + '/login');
    await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP! + "/login")

});