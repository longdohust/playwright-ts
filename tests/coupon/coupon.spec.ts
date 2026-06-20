import { test, expect, Page } from '@playwright/test';
import path from 'path';
import process from 'process';
import { CommonPage } from '../../src/pages/commonPage';
import { NewCouponPage } from '../../src/pages/newCouponPage';
import { LoginPage } from '../../src/pages/loginPage';
import { DashboardPage } from '../../src/pages/dashboardPage';
import { CouponPage } from '../../src/pages/couponPage';

let newCouponPage: NewCouponPage;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let couponPage: CouponPage;

test.beforeEach('Before each test', async({page}) => {
    newCouponPage = new NewCouponPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    couponPage = new CouponPage(page);

    await page.goto('http://localhost:3000/admin');
});

test('Verify user can create a nre coupon successfully', async ({page}) => {
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
        await loginPage.isOnPage();
        await loginPage.adminLogin('long@gmail.com', '1234567890')

        await dashboardPage.isOnPage();
        await dashboardPage.clickMenuItemByLabel('New Coupon');

        await newCouponPage.isOnPage();
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
        await newCouponPage.inputTextByLabel('Coupon Code*', inputData.couponCode);
        await newCouponPage.inputTextByLabel('Description*', inputData.description);
        await newCouponPage.selectRadioOptionByLabel('Status*', 'Disabled');
        await newCouponPage.inputTextByLabel('Discount amount*', inputData.discountAmount);
        await newCouponPage.inputDateByLabel('Start date', inputData.startDate);
        await newCouponPage.inputDateByLabel('End date', inputData.endDate);
        await newCouponPage.selectCheckboxByLabel('Free shipping?', 'check');
        await newCouponPage.selectRadioOptionByLabelCoupon('Discount Type', inputData.discountType);
        await newCouponPage.inputTextByLabel('Minimum purchase amount', inputData.minimumAmount);
        await newCouponPage.inputTextByLabel('Minimum purchase qty', inputData.minimumQuantity);
        await newCouponPage.selectDropdownByLabelCoupon('Customer groups', 'Default');
        await newCouponPage.inputTextByLabel("Customer's purchase", inputData.customerPurchase);
        await newCouponPage.clickButtonByLabel('Save');
        await expect(page.getByText(`Editing ${inputData.couponCode}`)).toBeVisible();
        await newCouponPage.clickMenuItemByLabel('Coupons');

        await couponPage.isOnPage();
        await couponPage.searchCouponByCode(inputData.couponCode);
        await couponPage.verifyCouponVisible(inputData.couponCode);
});
