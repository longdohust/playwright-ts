import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";

export class DashboardPage extends CommonPage implements CommonInterface{
    constructor(page: Page){
        super(page);
    }

    async isOnPage(){
        await expect(this.page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
        
    }
}