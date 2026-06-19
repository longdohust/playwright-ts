import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class NewProductPage{
    page: Page;
    commonPage: CommonPage;

    constructor(page: Page){
        this.page = page;
        this.commonPage = new CommonPage(page);
    }

    async isOnpage(){
        await expect(this.page.locator('//h1[text()="Create a new product"]')).toBeVisible();
    }

    async selectProductCategory(category: string) {
        await this.commonPage.clickButtonByLabel('Select category');
        await this.page.getByPlaceholder('Search categories').fill(category);
        await this.page.locator(`//h3[normalize-space()='${category}']/following::button[1][normalize-space()='Select']`).click();
    }
}