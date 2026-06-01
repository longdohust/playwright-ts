import {test, expect} from '@playwright/test';

test('Verify login successful', async ({page}) => {
    await page.goto('http://localhost:3000/admin');
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
    await expect(signInBtn).toBeVisible();
    await page.locator('#field-email').fill('long@gmail.com');
    await page.locator('#field-password').fill('1234567890');
    await signInBtn.click();
    //First case: Must use xpath with class
    await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
    //Seconde case: Must use xpath with text
    await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();

});