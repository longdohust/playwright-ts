import { test, expect, Page } from '@playwright/test';
import path from 'path';
import process from 'process';
import { CommonPage } from '../../src/pages/commonPage';
import { CouponPage } from '../../src/pages/couponPage';
import { LoginPage } from '../../src/pages/loginPage';

let commonPage: CommonPage;
let couponPage: CouponPage;
let loginPage: LoginPage;

test.beforeEach('Before each test', async({page}) => {
    commonPage = new CommonPage(page);
    couponPage = new CouponPage(page);
    loginPage = new LoginPage(page);

    await page.goto('http://localhost:3000/admin');
});

test('Verify user can create a nre coupon successfully', async ({page}) => {
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
        await loginPage.isOnPage();
        await loginPage.adminLogin('long@gmail.com', '1234567890')
        await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');

        await commonPage.clickMenuItemByLabel('New Coupon');
        await couponPage.isOnPage();

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

        await commonPage.inputTextByLabel('Coupon Code*', inputData.couponCode);
        await commonPage.inputTextByLabel('Description*', inputData.description);
        await commonPage.selectRadioOptionByLabel('Status*', 'Disabled');
        await commonPage.inputTextByLabel('Discount amount*', inputData.discountAmount);
        await commonPage.inputDateByLabel('Start date', inputData.startDate);
        await commonPage.inputDateByLabel('End date', inputData.endDate);
        await commonPage.selectCheckboxByLabel('Free shipping?', 'check');
        await couponPage.selectRadioOptionByLabelCoupon('Discount Type', inputData.discountType);
        await commonPage.inputTextByLabel('Minimum purchase amount', inputData.minimumAmount);
        await commonPage.inputTextByLabel('Minimum purchase qty', inputData.minimumQuantity);
        await couponPage.selectDropdownByLabelCoupon('Customer groups', 'Default');
        await commonPage.inputTextByLabel("Customer's purchase", inputData.customerPurchase);
        await commonPage.clickButtonByLabel('Save');
        await expect(page.getByText(`Editing ${inputData.couponCode}`)).toBeVisible();
});
