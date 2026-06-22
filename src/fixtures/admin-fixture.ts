import { test as base } from '@playwright/test';
import { adminBaseUrl } from '../utils/constants-ultils';
import { LoginPage } from '../pages/loginPage';

export const adminTest = base.extend({
  page: async ({ page }, use) => {
    await page.goto(adminBaseUrl);
    let loginPage = new LoginPage(page);
    await loginPage.isOnPage();
    await loginPage.defaultAdminLogin();
    await use(page);
  },
});