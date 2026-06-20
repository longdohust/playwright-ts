import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";

export class NewCouponPage extends CommonPage{
    constructor(page: Page) {
        super(page);
    }
    async selectRadioOptionByLabelCoupon(label: string, option: string){
        let xpath = `//div[normalize-space()='${label}']/following::label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
        await this.page.locator(xpath).click();
    }

    async isOnPage(){
        await this.verifyHeaderByText('Create a new coupon')
    }
    async selectDropdownByLabelCoupon(label: string, option: string) {
        let dropdownXpath = `//label[normalize-space()='${label}']/following::input[1]`;
        let locator = this.page.locator(dropdownXpath);
        await locator.click();
        let optionXpath = `//div[@role='option' and normalize-space()='${option}']`;
        await this.page.locator(optionXpath).click();
    };
}