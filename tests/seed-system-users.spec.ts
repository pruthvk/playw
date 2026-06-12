import { test } from './testFixtures';
import { LoginPage } from './pages/LoginPage';

test('seed - login to OrangeHRM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await loginPage.expectDashboardVisible();
});
