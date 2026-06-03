import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const validCredentials = { username: 'Admin', password: 'admin123' };
const invalidCredentials = [
  { username: 'Admin', password: 'wrongPassword', description: 'invalid password' },
  { username: 'wrongUser', password: 'admin123', description: 'invalid username' },
];

test.describe('OrangeHRM login page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.describe('page appearance', () => {
    test('should display login page fields and submit button', async () => {
      await loginPage.expectLoginFormVisible();
    });
  });

  test.describe('login flow', () => {
    test('valid login should navigate to dashboard and logout successfully', async () => {
      await loginPage.login(validCredentials.username, validCredentials.password);
      await loginPage.expectDashboardVisible();
      await loginPage.logout();
    });

    for (const scenario of invalidCredentials) {
      test(`should show invalid credentials error for ${scenario.description}`, async () => {
        await loginPage.login(scenario.username, scenario.password);
        await loginPage.expectInvalidCredentialsError();
      });
    }

    test('should allow retry after invalid credentials', async () => {
      await loginPage.login(validCredentials.username, 'wrongPassword');
      await loginPage.expectInvalidCredentialsError();
      await loginPage.login(validCredentials.username, validCredentials.password);
      await loginPage.expectDashboardVisible();
      await loginPage.logout();
    });
  });

  test.describe('validation errors', () => {
    test('missing username and password should show required messages', async () => {
      await loginPage.submit();

      await loginPage.expectRequiredErrorCount(2);
      await loginPage.expectRequiredErrorText(0);
      await loginPage.expectRequiredErrorText(1);
    });

    test('missing username should show a required message for username only', async () => {
      await loginPage.fillPassword(validCredentials.password);
      await loginPage.submit();

      await loginPage.expectRequiredErrorCount(1);
      await loginPage.expectRequiredErrorText(0);
    });

    test('missing password should show a required message for password only', async () => {
      await loginPage.fillUsername(validCredentials.username);
      await loginPage.submit();

      await loginPage.expectRequiredErrorCount(1);
      await loginPage.expectRequiredErrorText(0);
    });

    test('should clear validation error after missing username is corrected', async () => {
      await loginPage.fillPassword(validCredentials.password);
      await loginPage.submit();
      await loginPage.expectRequiredErrorCount(1);

      await loginPage.fillUsername(validCredentials.username);
      await loginPage.submit();

      await loginPage.expectDashboardVisible();
      await loginPage.logout();
    });
  });
});