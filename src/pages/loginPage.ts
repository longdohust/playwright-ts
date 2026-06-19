import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";

export class LoginPage extends CommonPage implements CommonInterface{
    signInBtn: Locator;

    constructor(page: Page){
        super(page);
        this.signInBtn = this.page.getByRole('button', {name: 'SIGN IN'});
    }

    async isOnPage(){
        await expect(this.signInBtn).toBeVisible();
    }

    async adminLogin(username: string, password: string){
        await this.inputDateByLabel('Email*', username);
        await this.inputDateByLabel('Password*',password);
        await this.signInBtn.click();
    }
}