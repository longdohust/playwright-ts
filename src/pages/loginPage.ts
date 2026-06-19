import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class LoginPage{
    page: Page;
    signInBtn: Locator;
    commonPage: CommonPage;

    constructor(page: Page){
        this.page = page;
        this.signInBtn = this.page.getByRole('button', {name: 'SIGN IN'});
        this.commonPage = new CommonPage(page);
    }

    async isOnPage(){
        await expect(this.signInBtn).toBeVisible();
    }

    async adminLogin(username: string, password: string){
        await this.commonPage.inputDateByLabel('Email*', username);
        await this.commonPage.inputDateByLabel('Password*',password);
        await this.signInBtn.click();
    }
}