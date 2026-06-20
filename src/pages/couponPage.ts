import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class CouponPage extends CommonPage{
    constructor(page: Page){
        super(page);
    }

    async isOnPage(){
        await this.verifyHeaderByText('Coupons');
    }

    async searchCouponByCode(code:string){
        await this.inputTextById('field-coupon', code);
        await this.page.keyboard.press('Enter');
    }

    async verifyCouponVisible(code:string){
        await expect(this.page.locator(`//table//td[normalize-space()="${code}"]`)).toBeVisible();
    }
}