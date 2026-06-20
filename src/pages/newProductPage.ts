import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";
import { verify } from "node:crypto";

export class NewProductPage extends CommonPage{

    constructor(page: Page){
        super(page);
    }

    async isOnPage(){
        await this.verifyHeaderByText('Create a new product');
    }

    async selectProductCategory(category: string) {
        await this.clickButtonByLabel('Select category');
        await this.page.getByPlaceholder('Search categories').fill(category);
        await this.page.locator(`//h3[normalize-space()='${category}']/following::button[1][normalize-space()='Select']`).click();
    }
}