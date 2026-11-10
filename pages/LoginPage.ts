import { Page, Locator } from '@playwright/test';
import { loginErrorMessage } from '../test-data/errorMessage';

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialMessage: Locator;
    readonly emptyCredentialMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByPlaceholder("Email");
        this.passwordField = page.getByPlaceholder("Password");
        this.loginButton = page.locator('main').getByRole('button', { name: 'Masuk' });
        this.invalidCredentialMessage = page.getByText(loginErrorMessage.emailOrPasswordInvalid);
        this.emptyCredentialMessage = page.getByText(loginErrorMessage.emptyFields);
    }

    async goto(platform: string = "desktop") {
        const baseUrl = platform === "mobile"
            ? (process.env.BASE_URL_MOBILE || 'https://m.kumparan.com')
            : (process.env.BASE_URL_DESKTOP || 'https://kumparan.com');
        await this.page.goto(`${baseUrl}/login`);
    }

    async fillForm(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
    }

    async submit() {
        await this.loginButton.click();
    }

    async fillAndSubmitForm(email: string, password: string) {
        await this.fillForm(email, password);
        await this.submit();
    }

    getErrorMessage(message: string): Locator {
        return this.page.locator('main').getByText(message);
    }
}