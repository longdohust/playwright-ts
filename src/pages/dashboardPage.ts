import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";

export class DashboardPage extends CommonPage{
    constructor(page: Page){
        super(page);
    }

    async isOnPage(){
        await this.verifyHeaderByText('Dashboard');
    }
}