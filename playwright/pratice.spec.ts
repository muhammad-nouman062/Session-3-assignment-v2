import { test, expect } from '@playwright/test';
import { PracticePage } from './practicepage'; // Double check this path matches where your page file is located

const TEST_URL = 'https://practice.automationtesting.in/';

test.describe('Generic Web Automation Practice Suite', () => {

  test('should load the home page and verify its title', async ({ page }) => {
    const practicePage = new PracticePage(page);
    await practicePage.navigateTo(TEST_URL);
    await expect(page).toHaveTitle(/Automation Practice Site/i);
  });

  test('should navigate to the My Account section via menu', async ({ page }) => {
    const practicePage = new PracticePage(page);
    await practicePage.navigateTo(TEST_URL);
    await practicePage.clickLoginNav();
    await expect(page).toHaveURL(/.*my-account/);
  });

  test('should display an error message when logging in with invalid credentials', async ({ page }) => {
    const practicePage = new PracticePage(page);
    await practicePage.navigateTo(`${TEST_URL}my-account/`);
    await practicePage.login('wronguser@test.com', 'InvalidPassword123');
    await expect(practicePage.errorMessage).toBeVisible();
    await expect(practicePage.errorMessage).toContainText('Error: The password you entered for the username');
  });

  test('should prevent form submission and show validation warning if fields are missing', async ({ page }) => {
    const practicePage = new PracticePage(page);
    await practicePage.navigateTo(`${TEST_URL}my-account/`);
    await practicePage.login('', '');
    await expect(practicePage.errorMessage).toBeVisible();
    await expect(practicePage.errorMessage).toContainText('Error: Username is required.');
  });

  test('should verify main shop page items are interactable', async ({ page }) => {
    const practicePage = new PracticePage(page);
    await practicePage.navigateTo(TEST_URL);
    await page.locator('text=Shop').click();
    const productItem = page.locator('.products li').first();
    await expect(productItem).toBeVisible();
  });
});