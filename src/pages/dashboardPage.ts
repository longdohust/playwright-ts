import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";
import * as allure from 'allure-js-commons';

export class DashboardPage extends CommonPage implements CommonInterface{
    constructor(page: Page){
        super(page);
    }

    async isOnPage(){
        await allure.step('Verify user is on Dashboard Page', async () => {
            await expect(this.page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
        });
    }
}