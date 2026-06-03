import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { SystemUsersPage } from './pages/SystemUsersPage';

const randomSuffix = () => Math.random().toString(36).substring(2, 8);
const uniqueUsername = (prefix: string) => `${prefix}.${randomSuffix()}`;

test.describe('Admin System Users Management', () => {
  let loginPage: LoginPage;
  let systemUsersPage: SystemUsersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    systemUsersPage = new SystemUsersPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await loginPage.expectDashboardVisible();

    await systemUsersPage.goto();
  });

  test.describe('System Users page appearance', () => {
    test('should display System Users page with Add button', async () => {
      await systemUsersPage.expectPageVisible();
    });

    test('should display the users table', async () => {
      await systemUsersPage.expectTableVisible();
      await systemUsersPage.expectTableHeadersVisible();
    });

    test('should display search and filter fields', async () => {
      await systemUsersPage.expectSearchFilterFieldsVisible();
    });
  });

  test.describe('Add User workflow', () => {
    test('should add a new user with Admin role successfully', async () => {
      const username = uniqueUsername('john.smith');

      await systemUsersPage.clickAdd();
      await systemUsersPage.expectAddUserFormVisible();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.verifyUserRoleSelected('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      const selectedEmployeeName = await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.verifyEmployeeSelected(selectedEmployeeName);
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(username);
      await systemUsersPage.fillPassword('TestPass@123');
      await systemUsersPage.expectPasswordStrengthVisible();
      await systemUsersPage.fillConfirmPassword('TestPass@123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectSystemUsersPageVisible();
      await systemUsersPage.expectUserDetailsInTable(username, 'Admin', selectedEmployeeName, 'Enabled');
    });

    test('should add a new user with ESS role successfully', async () => {
      const username = uniqueUsername('peter.ess');

      await systemUsersPage.clickAdd();
      await systemUsersPage.expectAddUserFormVisible();
      await systemUsersPage.selectUserRole('ESS');
      await systemUsersPage.fillEmployeeName('Peter');
      const suggestedEmployee = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(suggestedEmployee).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(username);
      await systemUsersPage.fillPassword('EssPass@123');
      await systemUsersPage.fillConfirmPassword('EssPass@123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectSystemUsersPageVisible();
      await systemUsersPage.expectUserInTable(username);
    });

    test('should display Add User form with all required fields', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.expectAddUserFormVisible();
      await systemUsersPage.expectAllRequiredFieldsVisible();
      await systemUsersPage.expectFormButtonsVisible();
    });

    test('should show password strength indicator', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const passwordEmployeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(passwordEmployeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(uniqueUsername('testuser'));
      await systemUsersPage.fillPassword('StrongPass@123');
      await systemUsersPage.expectPasswordStrengthVisible();
    });

    test('should cancel adding a user without saving', async () => {
      const initialCount = await systemUsersPage.getRecordsCount();
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillUsername(uniqueUsername('cancelled.user'));
      await systemUsersPage.clickCancel();
      await systemUsersPage.expectSystemUsersPageVisible();
      const newCount = await systemUsersPage.getRecordsCount();
      expect(newCount).toBe(initialCount);
    });
  });

  test.describe('Negative tests - Validation errors', () => {
    test('should show validation error when User Role is not selected', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.clickSave();
      await systemUsersPage.expectAddUserFormStillVisible();
    });

    test('should show validation error when Employee Name is not selected', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(uniqueUsername('testuser'));
      await systemUsersPage.clickSave();
      await systemUsersPage.expectAddUserFormStillVisible();
    });

    test('should show validation error when Status is not selected', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.fillUsername(uniqueUsername('testuser'));
      await systemUsersPage.fillPassword('Pass@123');
      await systemUsersPage.fillConfirmPassword('Pass@123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectAddUserFormStillVisible();
    });

    test('should show validation error when Username is empty', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillPassword('Pass@123');
      await systemUsersPage.fillConfirmPassword('Pass@123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectAddUserFormStillVisible();
    });

    test('should show validation error when Password is empty', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(uniqueUsername('testuser'));
      await systemUsersPage.clickSave();
      await systemUsersPage.expectAddUserFormStillVisible();
    });

    test('should show validation error when passwords do not match', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(uniqueUsername('testuser'));
      await systemUsersPage.fillPassword('Pass@123');
      await systemUsersPage.fillConfirmPassword('DifferentPass@123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectAddUserFormStillVisible();
      await systemUsersPage.expectPasswordMismatchError();
    });

    test('should show validation error for weak password', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Enabled');
      await systemUsersPage.fillUsername(uniqueUsername('testuser'));
      await systemUsersPage.fillPassword('weakpass123');
      await systemUsersPage.fillConfirmPassword('weakpass123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectWeakPasswordStrength();
    });
  });

  test.describe('User Role options', () => {
    test('should display all available user roles', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.selectUserRole('ESS');
    });
  });

  test.describe('Status options', () => {
    test('should display available status options', async () => {
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.expectStatusOptionVisible('Enabled');
      await systemUsersPage.expectStatusOptionVisible('Disabled');
    });
  });

  test.describe('Disabled user creation', () => {
    test('should be able to create a user with Disabled status', async () => {
      const username = uniqueUsername('disabled.user');
      await systemUsersPage.clickAdd();
      await systemUsersPage.selectUserRole('Admin');
      await systemUsersPage.fillEmployeeName('Peter');
      const employeeName = await systemUsersPage.getFirstEmployeeSuggestion();
      expect(employeeName).toBeTruthy();
      await systemUsersPage.selectFirstEmployeeSuggestion();
      await systemUsersPage.selectStatus('Disabled');
      await systemUsersPage.fillUsername(username);
      await systemUsersPage.fillPassword('DisabledPass@123');
      await systemUsersPage.fillConfirmPassword('DisabledPass@123');
      await systemUsersPage.clickSave();
      await systemUsersPage.expectSystemUsersPageVisible();
      await systemUsersPage.expectUserInTable(username);
      await systemUsersPage.expectDisabledStatusInTable(username);
    });
  });

  test.describe('Search and filter functionality', () => {
    test('should search user by username', async () => {
      await systemUsersPage.searchByUsername('Admin');
      await systemUsersPage.expectUserSearchResultVisible('Admin');
    });

    test('should reset search filters', async () => {
      await systemUsersPage.searchByUsername('Admin');
      await systemUsersPage.resetFilters();
      await expect(systemUsersPage.recordsFoundText).toBeVisible();
    });
  });
});
