import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonInterface } from "./commonInterface";
import { adminPassword, adminUsername} from "../utils/constants-ultils";

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
        await this.inputTextByLabel('Email*', username);
        await this.inputTextByLabel('Password*',password);
        await this.signInBtn.click();
    }

    async defaultAdminLogin() {
        await this.adminLogin(adminUsername, adminPassword);
    }
}