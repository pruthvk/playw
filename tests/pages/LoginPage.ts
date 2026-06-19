import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  static readonly url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginErrorBanner: Locator;
  readonly requiredInputErrors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot your password\?/i });
    this.loginErrorBanner = page.locator('[role="alert"], //p[contains(@class,"alert")]').first();
    this.requiredInputErrors = page.locator('span.oxd-input-field-error-message, [class*="error-message"]');
  }

  async goto() {
    await this.page.goto(LoginPage.url, { waitUntil: 'networkidle', timeout: 60000 });
    await this.page.waitForURL(/auth\/login/, { timeout: 15000 });
    await this.expectOnLoginPage();
  }

  async expectOnLoginPage() {
    await this.page.waitForTimeout(1000);
    await expect(this.usernameInput).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 5000 });
    await expect(this.submitButton).toBeVisible({ timeout: 5000 });
  }

  async expectLoginFormVisible() {
    await this.expectOnLoginPage();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clearFields() {
    await this.usernameInput.fill('');
    await this.passwordInput.fill('');
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async gotoForgotPasswordPage() {
    await expect(this.forgotPasswordLink).toBeVisible({ timeout: 10000 });
    await this.forgotPasswordLink.click();
  }

  async expectForgotPasswordPageVisible() {
    await this.page.waitForURL(/requestPasswordReset|passwordReset/, { timeout: 15000 });
    await expect(this.page.getByRole('heading', { name: /reset password/i })).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByRole('textbox', { name: /username/i })).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByRole('button', { name: /reset password/i })).toBeVisible({ timeout: 15000 });
  }

  async expectDashboardVisible() {
    await this.page.waitForURL(/dashboard/, { timeout: 15000 });
    await expect(this.page.getByRole('heading', { name: /dashboard|pizarra/i })).toBeVisible({ timeout: 15000 });
  }

  async logout() {
    await this.page.getByAltText('profile picture').first().click();
    await this.page.getByText(/logout|uitloggen|cerrar sesión/i).click();
    await this.expectOnLoginPage();
  }

  async expectInvalidCredentialsError() {
    await expect(this.loginErrorBanner).toBeVisible();
  }

  async expectRequiredErrorCount(count: number) {
    await expect(this.requiredInputErrors).toHaveCount(count);
  }

  async expectRequiredErrorText(index: number, text?: string) {
    const error = this.requiredInputErrors.nth(index);
    await expect(error).toBeVisible();
    if (text) {
      await expect(error).toHaveText(text);
    }
  }

  async expectNoRequiredErrors() {
    await expect(this.requiredInputErrors).toHaveCount(0);
  }
}
