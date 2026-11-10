import { test, expect } from '../../fixtures/BaseTest';
import { LoginPage } from '../../pages/LoginPage';
import { HomepageMobile } from '../../pages/mobile/HomepageMobile';
import { authData } from '../../test-data/auth';
import { loginErrorMessage } from '../../test-data/errorMessage';


test.beforeEach("go to login page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("mobile");
    await expect(page).toHaveURL(new RegExp(process.env.BASE_URL_MOBILE! + "/login"));
});

test("Verifikasi Login menggunakan Kredensial yang Valid", { tag: ['@LGN-001', '@High'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homepage = new HomepageMobile(page);

    await loginPage.fillForm(authData.validEmail, authData.validPassword);

    // await loginPage.fillAndSubmitForm(authData.validEmail, authData.validPassword);
    // await expect(page).toHaveURL(process.env.BASE_URL_DESKTOP!);
    // await expect(homepage.imgProfileAvatar).toBeVisible();

});

test("Verifikasi Login menggunakan email yang invalid", { tag: ['@LGN-002', '@Medium'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillForm(authData.invalidEmail, authData.validPassword);
    // await expect(loginPage.invalidCredentialMessage).toBeVisible();
});

test("Verifikasi Login menggunakan password yang invalid", { tag: ['@LGN-003', '@Medium'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillForm(authData.validEmail, authData.invalidPassword);
    // await expect(loginPage.invalidCredentialMessage).toBeVisible();
});

test("Verifikasi tidak bisa login saat fields email dan password kosong", { tag: ['@LGN-004', '@Low'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.fillForm("", "");
    await expect(loginPage.emptyCredentialMessage).toBeVisible();
});