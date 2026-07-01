import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";
import * as allure from 'allure-js-commons';

export class CouponPage extends CommonPage implements CommonInterface{
    constructor(page: Page) {
        super(page);
    }
    async selectRadioOptionByLabelCoupon(label: string, option: string){
        await allure.step(`Select "${option}" radio option from "${label}" group`, async () => {
            let xpath = `//div[normalize-space()='${label}']/following::label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
            await this.page.locator(xpath).click();
        });
    }

    async isOnPage(){
        await allure.step('Verify user is on Coupon Page', async () => {
            await expect(this.page.locator('//h1[text()="Create a new coupon"]')).toBeVisible();
        });
    }

    async selectDropdownByLabelCoupon(label: string, option: string) {
        await allure.step(`Select "${option}" from "${label}" dropdown list`, async () => {
            let dropdownXpath = `//label[normalize-space()='${label}']/following::input[1]`;
            let locator = this.page.locator(dropdownXpath);
            await locator.click();
            let optionXpath = `//div[@role='option' and normalize-space()='${option}']`;
            await this.page.locator(optionXpath).click();
        });
    };
}