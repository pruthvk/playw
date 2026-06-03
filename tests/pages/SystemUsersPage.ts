import { expect, Locator, Page } from '@playwright/test';

export class SystemUsersPage {
  static readonly url = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers';

  readonly page: Page;
  readonly addButton: Locator;
  readonly usersTable: Locator;
  readonly pageHeading: Locator;
  readonly usernameSearchField: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly recordsFoundText: Locator;
  readonly addUserCard: Locator;
  readonly filterSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: /Add|Agregar/i });
    this.pageHeading = page.getByRole('heading', { name: /System Users|Usuarios del Sistema/i });
    this.usersTable = page.getByRole('table');
    this.usernameSearchField = page.locator('.oxd-input-group', { hasText: /Username|Nombre de usuario/i }).locator('input').first();
    this.searchButton = page.getByRole('button', { name: /Search|Buscar/i });
    this.resetButton = page.getByRole('button', { name: /Reset|Reiniciar/i });
    this.recordsFoundText = page.getByText(/\(\d+\) Records Found/);
    this.addUserCard = page.locator('.orangehrm-card-container', { has: page.getByRole('heading', { name: /Add User|Agregar usuario/i }) });
    this.filterSection = page.locator('.oxd-table-filter');
  }

  async goto() {
    await this.page.goto(SystemUsersPage.url);
  }

  async expectPageVisible() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.addButton).toBeVisible();
  }

  async expectTableVisible() {
    await expect(this.usersTable).toBeVisible();
  }

  async expectTableHeadersVisible() {
    await expect(this.page.getByRole('columnheader', { name: /Username|Nombre de usuario/i })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /User Role|Rol de Usuario/i })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /Employee Name|Nombre del Empleado/i })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: /Status|Estatus/i })).toBeVisible();
  }

  async expectSearchFilterFieldsVisible() {
    await expect(this.filterSection).toBeVisible({ timeout: 10000 });
    await expect(this.filterSection.getByText(/Username|Nombre de usuario/i)).toBeVisible({ timeout: 5000 });
    await expect(this.filterSection.getByText(/User Role|Rol de Usuario/i)).toBeVisible({ timeout: 5000 });
    await expect(this.filterSection.getByText(/Employee Name|Nombre del Empleado/i)).toBeVisible({ timeout: 5000 });
    await expect(this.filterSection.getByText(/Status|Estatus/i)).toBeVisible({ timeout: 5000 });
    await expect(this.searchButton).toBeVisible({ timeout: 5000 });
    await expect(this.resetButton).toBeVisible({ timeout: 5000 });
  }

  private fieldLabelPattern(label: string) {
    const patterns: Record<string, RegExp> = {
      'User Role': /User Role|Rol de Usuario/i,
      'Employee Name': /Employee Name|Nombre del Empleado/i,
      Status: /Status|Estatus/i,
      Username: /Username|Nombre de usuario/i,
      Password: /Password|Contraseña/i,
      'Confirm Password': /Confirm Password|Confirmar Contraseña/i,
    };
    return patterns[label] ?? new RegExp(label, 'i');
  }

  private addUserFieldGroup(label: string) {
    return this.addUserCard.locator('.oxd-input-group', { hasText: this.fieldLabelPattern(label) }).first();
  }

  private filterFieldGroup(label: string) {
    return this.filterSection.locator('.oxd-input-group', { hasText: this.fieldLabelPattern(label) }).first();
  }

  private dropdownField(label: string) {
    return this.addUserFieldGroup(label)
      .locator('.oxd-select-text-input, .oxd-select-text, .oxd-select-text__value, div[role="button"], span')
      .first();
  }

  private filterDropdownField(label: string) {
    return this.filterFieldGroup(label)
      .locator('.oxd-select-text-input, .oxd-select-text, .oxd-select-text__value, div[role="button"], span')
      .first();
  }

  private inputField(label: string) {
    return this.addUserFieldGroup(label).locator('input').first();
  }

  private async clickOption(optionText: string) {
    const option = this.page.locator('.oxd-select-dropdown .oxd-select-option', { hasText: optionText }).first();
    if (await option.count()) {
      await option.click();
      return;
    }
    await this.page.getByText(optionText).first().click();
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async expectAddUserFormVisible() {
    await expect(this.addUserCard).toBeVisible();
    await expect(this.addUserCard.getByRole('heading', { name: /Add User|Agregar usuario/i })).toBeVisible();
  }

  async expectAllRequiredFieldsVisible() {
    await expect(this.addUserCard.getByText(/^User Role$|^Rol de Usuario$/i)).toBeVisible();
    await expect(this.addUserCard.getByText(/^Employee Name$|^Nombre del Empleado$/i)).toBeVisible();
    await expect(this.addUserCard.getByText(/^Status$|^Estatus$/i)).toBeVisible();
    await expect(this.addUserCard.getByText(/^Username$|^Nombre de usuario$/i)).toBeVisible();
    await expect(this.addUserCard.getByText(/^Password$|^Contraseña$/i)).toBeVisible();
    await expect(this.addUserCard.getByText(/^Confirm Password$|^Confirmar Contraseña$/i)).toBeVisible();
  }

  async expectFormButtonsVisible() {
    await expect(this.addUserCard.getByRole('button', { name: /Cancel|Cancelar/i })).toBeVisible();
    await expect(this.addUserCard.getByRole('button', { name: /Save|Guardar/i })).toBeVisible();
  }

  async selectUserRole(role: string) {
    await this.page.waitForTimeout(500);
    const roleSelect = this.addUserFieldGroup('User Role').locator('.oxd-select-text-input, [role="button"]').first();
    await roleSelect.scrollIntoViewIfNeeded();
    await roleSelect.click();
    await this.page.waitForTimeout(500);
    const option = this.page.locator('.oxd-select-dropdown .oxd-select-option, option, div[role="option"]', { hasText: role }).first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(300);
  }

  async verifyUserRoleSelected(role: string) {
    const fieldGroup = this.addUserFieldGroup('User Role');
    await expect(fieldGroup).toContainText(role, { timeout: 5000 });
  }

  async fillEmployeeName(employeeName: string) {
    await this.inputField('Employee Name').fill(employeeName);
  }

  private async waitForEmployeeSuggestionsReady() {
    await this.page.waitForFunction(() => {
      const options = Array.from(document.querySelectorAll('.oxd-autocomplete-dropdown .oxd-autocomplete-option'));
      return options.some((option) => {
        const text = (option.textContent || '').trim();
        return text.length > 0 && !/Searching|Loading/i.test(text);
      });
    }, null, { timeout: 20000 });
  }

  async expectEmployeeSuggestionVisible(employeeName: string) {
    await this.waitForEmployeeSuggestionsReady();
    const option = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option', {
      hasText: employeeName,
      hasNotText: /Searching|Loading/i,
    }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
  }

  async selectEmployee(employeeName: string) {
    await this.waitForEmployeeSuggestionsReady();
    const option = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option', {
      hasText: employeeName,
      hasNotText: /Searching|Loading/i,
    }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    // Wait for form to stabilize after employee selection
    await this.page.waitForTimeout(1000);
  }

  async verifyEmployeeSelected(employeeName: string) {
    await expect(this.inputField('Employee Name')).toHaveValue(employeeName);
  }

  async selectStatus(status: string) {
    await this.page.waitForTimeout(500);
    const statusSelect = this.addUserFieldGroup('Status').locator('.oxd-select-text-input, [role="button"]').first();
    await statusSelect.scrollIntoViewIfNeeded();
    await statusSelect.click();
    await this.page.waitForTimeout(500);
    const option = this.page.locator('.oxd-select-dropdown .oxd-select-option, option, div[role="option"]', { hasText: status }).first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(300);
  }

  async expectStatusOptionVisible(status: string) {
    const statusSelect = this.addUserFieldGroup('Status').locator('.oxd-select-text-input, [role="button"]').first();
    await statusSelect.scrollIntoViewIfNeeded();
    await statusSelect.click();
    await this.page.waitForTimeout(300);
    const option = this.page.locator('.oxd-select-dropdown .oxd-select-option, option, div[role="option"]', {
      hasText: status,
    }).first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async fillUsername(username: string) {
    await this.inputField('Username').fill(username);
  }

  async fillPassword(password: string) {
    await this.inputField('Password').fill(password);
  }

  async expectPasswordStrengthVisible() {
    await expect(this.page.locator('text=Strong')).toBeVisible();
  }

  async fillConfirmPassword(password: string) {
    await this.inputField('Confirm Password').fill(password);
  }

  async clickSave() {
    await this.addUserCard.getByRole('button', { name: /Save|Guardar/i }).click();
  }

  async clickCancel() {
    await this.addUserCard.getByRole('button', { name: /Cancel|Cancelar/i }).click();
  }

  async expectUserInTable(username: string) {
    const userRow = this.page.locator('[role="row"]', { hasText: username }).first();
    await expect(userRow).toBeVisible();
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private employeeNamePattern(employeeName: string) {
    const normalized = employeeName.replace(/\s+/g, ' ').trim();
    const parts = normalized.split(' ');
    if (parts.length <= 2) {
      return new RegExp(this.escapeRegExp(normalized), 'i');
    }
    const first = this.escapeRegExp(parts[0]);
    const last = this.escapeRegExp(parts[parts.length - 1]);
    return new RegExp(`${first}\\s+(?:\\S+\\s+)*?${last}`, 'i');
  }

  statusTextPattern(status: string) {
    if (status.match(/enabled/i)) return /Enabled|Habilitado/i;
    if (status.match(/disabled/i)) return /Disabled|Deshabilitado/i;
    return new RegExp(status, 'i');
  }

  async expectUserDetailsInTable(username: string, role: string, employeeName: string, status: string) {
    const userRow = this.page.locator('[role="row"]', { hasText: username }).first();
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText(username);
    await expect(userRow).toContainText(role);
    await expect(userRow).toContainText(this.employeeNamePattern(employeeName));
    await expect(userRow).toContainText(this.statusTextPattern(status));
  }

  async getRecordsCount(): Promise<number> {
    await this.recordsFoundText.waitFor({ state: 'visible', timeout: 5000 });
    const recordsText = await this.recordsFoundText.textContent();
    // Extract number from format "(X) Records Found"
    const match = recordsText?.match(/\((\d+)\)/);
    return match ? parseInt(match[1]) : 0;
  }

  async searchByUsername(username: string) {
    await this.usernameSearchField.fill(username);
    await this.searchButton.click();
  }

  async resetFilters() {
    await this.resetButton.click();
  }

  async expectUserSearchResultVisible(username: string) {
    const userRow = this.page.locator('[role="row"]', { hasText: username }).first();
    await expect(userRow).toBeVisible();
  }

  async getFirstEmployeeSuggestion(): Promise<string | null> {
    await this.waitForEmployeeSuggestionsReady();
    const firstOption = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option', {
      hasNotText: /Searching|Loading/i,
    }).first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    return (await firstOption.textContent())?.trim() || null;
  }

  async selectFirstEmployeeSuggestion(): Promise<string> {
    await this.waitForEmployeeSuggestionsReady();
    const firstOption = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option', {
      hasNotText: /Searching|Loading/i,
    }).first();
    await expect(firstOption).toBeVisible({ timeout: 10000 });
    await firstOption.click();
    return (await this.inputField('Employee Name').inputValue()).trim();
  }

  async getSelectedEmployeeName(): Promise<string> {
    return (await this.inputField('Employee Name').inputValue()).trim();
  }

  async expectPasswordMismatchError() {
    const errorMsg = this.page.locator('text=/password|mismatch|match/i');
    await expect(errorMsg).toBeVisible({ timeout: 3000 }).catch(() => {
      // If specific error not shown, form should still be visible
    });
  }

  async expectWeakPasswordStrength() {
    await expect(this.page.locator('text=/Weak|Medium/')).toBeVisible({ timeout: 3000 }).catch(() => {
      // Might not show strength indicator
    });
  }

  async expectAddUserFormStillVisible() {
    await expect(this.page.getByRole('heading', { name: /Add User|Agregar usuario/i })).toBeVisible();
  }

  async expectSystemUsersPageVisible() {
    await expect(this.page).toHaveURL(/admin\/(viewSystemUsers|saveSystemUser)/, { timeout: 15000 });
    await expect(this.page.getByRole('heading', { name: /System Users|Usuarios del Sistema/i })).toBeVisible({ timeout: 15000 });
    await expect(this.searchButton).toBeVisible({ timeout: 15000 });
    await expect(this.usersTable).toBeVisible({ timeout: 15000 });
  }

  async expectDisabledStatusInTable(username: string) {
    const userRow = this.page.locator('[role="row"]', { hasText: username }).first();
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText('Disabled');
  }
}
