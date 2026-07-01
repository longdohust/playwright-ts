import { expect } from '@playwright/test';
import { CouponPage } from '../../src/pages/couponPage';
import { LoginPage } from '../../src/pages/loginPage';
import { DashboardPage } from '../../src/pages/dashboardPage';
import { adminTest } from '../../src/fixtures/admin-fixture';

let couponPage: CouponPage;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;

adminTest.beforeEach('Before each test', async({page}) => {
    couponPage = new CouponPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    //await page.goto(adminBaseUrl);
});

adminTest(
  "Verify user can create a nre coupon successfully",
  async ({ page }) => {
    await dashboardPage.isOnPage();
    let signInBtn = page.getByRole("button", { name: "SIGN IN" });
    // await loginPage.isOnPage();
    // await loginPage.defaultAdminLogin();

    await dashboardPage.clickMenuItemByLabel("New Coupon");
    await couponPage.isOnPage();

    const random = new Date().getTime();
    const inputData = {
      couponCode: `Code${random}`,
      description: "This is a coupon created by Playwright",
      discountAmount: "100",
      startDate: "01/10/2026",
      endDate: "31/10/2026",
      discountType: "Fixed discount to entire order",
      minimumAmount: "200",
      minimumQuantity: "1",
      customerPurchase: "1",
    };
    await couponPage.inputTextByLabel("Coupon Code*", inputData.couponCode);
    await couponPage.inputTextByLabel("Description*", inputData.description);
    await couponPage.selectRadioOptionByLabel("Status*", "Disabled");
    await couponPage.inputTextByLabel(
      "Discount amount*",
      inputData.discountAmount,
    );
    await couponPage.inputDateByLabel("Start date", inputData.startDate);
    await couponPage.inputDateByLabel("End date", inputData.endDate);
    await couponPage.selectCheckboxByLabel("Free shipping?", "check");
    await couponPage.selectRadioOptionByLabelCoupon(
      "Discount Type",
      inputData.discountType,
    );
    await couponPage.inputTextByLabel(
      "Minimum purchase amount",
      inputData.minimumAmount,
    );
    await couponPage.inputTextByLabel(
      "Minimum purchase qty",
      inputData.minimumQuantity,
    );
    await couponPage.selectDropdownByLabelCoupon("Customer groups", "Default");
    await couponPage.inputTextByLabel(
      "Customer's purchase",
      inputData.customerPurchase,
    );
    await couponPage.clickButtonByLabel("Save");
    await expect(
      page.getByText(`Editing ${inputData.couponCode}`),
    ).toBeVisible();
  },
);
