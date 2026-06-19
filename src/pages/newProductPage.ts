import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";

export class NewProductPage extends CommonPage implements CommonInterface{

    constructor(page: Page){
        super(page);
    }

    async isOnPage(){
        await expect(this.page.locator('//h1[text()="Create a new product"]')).toBeVisible();
    }

    async selectProductCategory(category: string) {
        await this.clickButtonByLabel('Select category');
        await this.page.getByPlaceholder('Search categories').fill(category);
        await this.page.locator(`//h3[normalize-space()='${category}']/following::button[1][normalize-space()='Select']`).click();
    }
}