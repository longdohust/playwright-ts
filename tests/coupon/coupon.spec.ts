import { test, expect, Page } from '@playwright/test';
import path from 'path';
import process from 'process';
import { inputTextByLabel, clickButtonByLabel, selectRadioOptionByLabel, selectCheckboxByLabel, selectDropdownByLabel, verifyNotification, clickMenuItemByLabel, inputDateByLabel } from '../../src/common/common';

test.beforeEach('Before each test', async({page}) => {
    await page.goto('http://localhost:3000/admin');
});

test('Verify user can create a nre coupon successfully', async ({page}) => {
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
        await expect(signInBtn).toBeVisible();
        await inputTextByLabel('Email*', 'long@gmail.com', page);
        await inputTextByLabel('Password*', '1234567890', page);
        await clickButtonByLabel('SIGN IN', page);
        await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');

        await clickMenuItemByLabel('New Coupon', page);
        await expect(page.locator('//h1[text()="Create a new coupon"]')).toBeVisible();

        const random = new Date().getTime();
        const inputData = {
            couponCode: `Code${random}`,
            description: 'This is a coupon created by Playwright',
            discountAmount: '100',
            startDate: '01/10/2026',
            endDate: '31/10/2026',
            discountType: 'Fixed discount to entire order',
            minimumAmount: '200',
            minimumQuantity: '1',
            customerPurchase: '1'

        };

        await inputTextByLabel('Coupon Code*', inputData.couponCode, page);
        await inputTextByLabel('Description*', inputData.description, page);
        await selectRadioOptionByLabel('Status*', 'Disabled', page);
        await inputTextByLabel('Discount amount*', inputData.discountAmount, page);
        await inputDateByLabel('Start date', inputData.startDate, page);
        await inputDateByLabel('End date', inputData.endDate, page);
        await selectCheckboxByLabel('Free shipping?', 'check', page);
        await selectRadioOptionByLabelCoupon('Discount Type', inputData.discountType, page);
        await inputTextByLabel('Minimum purchase amount', inputData.minimumAmount, page);
        await inputTextByLabel('Minimum purchase qty', inputData.minimumQuantity, page);
        await selectDropdownByLabelCoupon('Customer groups', 'Default', page);
        await inputTextByLabel("Customer's purchase", inputData.customerPurchase, page);
        await clickButtonByLabel('Save', page);
        await expect(page.getByText(`Editing ${inputData.couponCode}`)).toBeVisible();
});

async function selectRadioOptionByLabelCoupon(label: string, option: string, page: Page){
    let xpath = `//div[normalize-space()='${label}']/following::label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
    await page.locator(xpath).click();
}

async function selectDropdownByLabelCoupon(label: string, option: string, page: Page) {
    let dropdownXpath = `//label[normalize-space()='${label}']/following::input[1]`;
    let locator = page.locator(dropdownXpath);
    await locator.click();
    let optionXpath = `//div[@role='option' and normalize-space()='${option}']`;
    await page.locator(optionXpath).click();
};