import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const validCredentials = { username: 'Admin', password: 'admin123' };

test.describe('OrangeHRM Login - Enhanced Input and Styling', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should show login heading and form labels', async () => {
    const heading = loginPage.page.locator('h5:has-text("Login")');
    await expect(heading).toBeVisible();
    await expect(loginPage.page.locator('label:has-text("Username")')).toBeVisible();
    await expect(loginPage.page.locator('label:has-text("Password")')).toBeVisible();
  });

  test('should display a login button labeled Login', async () => {
    await expect(loginPage.submitButton).toBeVisible();
    const buttonText = (await loginPage.submitButton.textContent())?.trim();
    expect(buttonText).toBe('Login');
  });

  test('should show the forgot password link on the login page', async () => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toHaveText(/forgot your password\?/i);
  });

  test('should navigate to the forgot password page when the link is clicked', async () => {
    await loginPage.gotoForgotPasswordPage();
    await loginPage.expectForgotPasswordPageVisible();
  });

  test('should keep username and password fields enabled', async () => {
    await expect(loginPage.usernameInput).toBeEnabled();
    await expect(loginPage.passwordInput).toBeEnabled();
  });

  test('should require the password field to mask typed characters', async () => {
    const type = await loginPage.passwordInput.getAttribute('type');
    expect(type).toBe('password');
  });

  test('should reject whitespace-only username input', async () => {
    await loginPage.login('   ', validCredentials.password);
    await expect(loginPage.loginErrorBanner).toBeVisible();
  });

  test('should reject whitespace-only password input', async () => {
    await loginPage.goto();
    await loginPage.login(validCredentials.username, '   ');
    await expect(loginPage.loginErrorBanner).toBeVisible();
  });

  test('should accept special characters in username and password fields', async () => {
    await loginPage.fillUsername('user+test@example.com');
    expect(await loginPage.usernameInput.inputValue()).toBe('user+test@example.com');

    await loginPage.fillPassword('p@$$w0rd!');
    expect(await loginPage.passwordInput.inputValue()).toBe('p@$$w0rd!');
  });

  test('should submit the login form by pressing Enter from the password field', async () => {
    await loginPage.fillUsername(validCredentials.username);
    await loginPage.fillPassword(validCredentials.password);
    await loginPage.passwordInput.press('Enter');
    await loginPage.expectDashboardVisible();
    await loginPage.logout();
  });

  test('should show validation styling for required input errors', async () => {
    await loginPage.submit();
    const firstError = loginPage.requiredInputErrors.first();
    await expect(firstError).toBeVisible();
    const className = await firstError.getAttribute('class');
    expect(className).toContain('error');
  });
});
