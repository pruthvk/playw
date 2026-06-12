import { test } from './testFixtures';
import { LoginPage } from './pages/LoginPage';

test.describe('OrangeHRM login coverage', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('invalid credentials should show an error banner', async () => {
    await loginPage.login('Admin', 'admin1234');
    await loginPage.expectInvalidCredentialsError();
  });
});