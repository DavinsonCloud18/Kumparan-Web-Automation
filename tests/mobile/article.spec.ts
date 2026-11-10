import { test, expect } from '../../fixtures/BaseTest';
import { HomepageMobile } from '../../pages/mobile/HomepageMobile';
import { ArticlePage } from '../../pages/ArticlePage';
import { CommentPage } from '../../pages/commentPage';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach('Mengakses homepage', async ({ page }) => {
    const homepage = new HomepageMobile(page);
    await homepage.goto('mobile');

    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE!);
});

test('Bisa melihat detail artikel', { tag: ['@ATC-001', '@High'] }, async ({ page }) => {
    const homepage = new HomepageMobile(page);
    const homepageArticleTitle = await homepage.articleTitle.innerText();
    const articleURL = await homepage.article.getAttribute('href');
    const articleHrefHomepage = await homepage.articleTitle.getAttribute('href');

    // await expect(homepage.article).toBeVisible();
    await homepage.clickArticle();

    const articlePage = new ArticlePage(page);
    const articlePageTitle = await articlePage.articleTitle.innerText();
    const articleHrefPage = await articlePage.articleTitle.getAttribute('href');

    await page.goto(process.env.BASE_URL_MOBILE! + articleURL);
    await expect(articlePageTitle).toBe(homepageArticleTitle);
    await expect(articlePage.channel).toBeVisible();
    await expect(articlePage.breadcrumb).toBeVisible();
    await expect(articleHrefHomepage).toBe(articleHrefPage);

});

test('Tidak bisa memberikan comment pada article ketika belum login', { tag: ['@ATC-003', '@Medium'] }, async ({ page }) => {
    const homepage = new HomepageMobile(page);
    const homepageArticleTitle = await homepage.articleTitle.innerText();
    const articleURL = await homepage.article.getAttribute('href');

    // await expect(homepage.article).toBeVisible();
    await homepage.clickArticle();

    const articlePage = new ArticlePage(page);
    const articlePageTitle = await articlePage.articleTitle.innerText();

    await page.goto(process.env.BASE_URL_MOBILE! + articleURL);
    await expect(articlePageTitle).toBe(homepageArticleTitle);

    await expect(articlePage.comment).toBeVisible();
    await articlePage.commentBtn.click();

    await page.goto(process.env.BASE_URL_MOBILE! + await articlePage.comment.getAttribute('href'));
    const commentPage = new CommentPage(page);
    await expect(commentPage.commentArea).toBeVisible();
    await commentPage.fillComment('ini adalah komentar');

    await commentPage.btnSendComment.click();

    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL_MOBILE! + '/login');
    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE! + "/login")

});

test('Tidak bisa melakukan polling news ketika belum login', { tag: ['@ATC-005', '@Low'] }, async ({ page }) => {
    const homepage = new HomepageMobile(page);
    // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(homepage.pollingTitle).toBeVisible();

    await expect(homepage.pollingBtn).toBeVisible();
    await homepage.pollingBtn.click();

    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL_MOBILE! + '/login');
    await expect(page).toHaveURL(process.env.BASE_URL_MOBILE! + "/login")

});