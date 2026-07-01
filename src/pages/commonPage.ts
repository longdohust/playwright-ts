import { expect, Page } from "@playwright/test";
import path from "path";
import { CommonInterface } from "./commonInterface";
import * as allure from 'allure-js-commons';

export class CommonPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //abstract isOnPage():void;
    async inputTextByLabel(label: string, value: string) {
        await allure.step(`Input text "${value}" in field with label "${label}"`, async () => {
            let xpath1= `//label[normalize-space()="${label}"]/following::input[1]`;
            let xpath2= `//label[normalize-space()="${label}"]/following::textarea[1]`;
            let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`)
            await locator.click();
            await locator.clear();
            await locator.fill(value);
        })
    }
    async inputDateByLabel(label: string, value: string) {
        await allure.step(`Input date "${value}" in field with label "${label}"`, async () => {
            let xpath1= `//label[normalize-space()="${label}"]/following::input[1]`;
            let xpath2= `//label[normalize-space()="${label}"]/following::textarea[1]`;
            let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`)
            await locator.click();
            await locator.clear();
            await this.page.keyboard.type(value);
        });
    }
    
    async clickButtonByLabel(label: string) {
        await allure.step(`Click "${label}" button`, async () => {
            let xpath = `//button[normalize-space()='${label}']`;
            await this.page.locator(xpath).click();
        })
    }
    
    async clickMenuItemByLabel(label:string) {
        await allure.step(`Click menu item "${label}"`, async () => {
            let xpath = `//div[contains(concat(' ', @class, ' ' ), ' admin-nav ')]//a[normalize-space()='${label}']`;
            await this.page.locator(xpath).click();
        });
    }
    
    async selectDropdownByLabel(label: string, option: string) {
        await allure.step(`Select "${option}" from "${label}" dropdown list`, async () => {
            let dropdownXpath1 = `//label[normalize-space()='${label}']/following::button[1]`;
            let dropdownXpath2 = `//span[normalize-space()='${label}']/following::button[1]`;
            let locator = this.page.locator(`(${dropdownXpath1} | ${dropdownXpath2})[1]`);
            await locator.click();
            let optionXpath = `//div[@role='option' and normalize-space()='${option}']`;
            await this.page.locator(optionXpath).click();
        });
    };
    
    async uploadImageByLabel (label: string, filePath: string) {
        await allure.step(`Upload image from "${filePath}" in field with label "${label}"`, async () => {
            let uploadFileXpath = `//div[@data-slot='card-title' and normalize-space()='${label}']/following::input[@type='file']`
            await this.page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), filePath));
        });
    }
    
    async selectRadioOptionByLabel(label: string, option: string){
        await allure.step(`Select "${option}" radio option from "${label}" group`, async () => {
            let xpath = `//div[@role='group' and .//label[normalize-space()='${label}']]//label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
            await this.page.locator(xpath).click();
        })
    }
    
    async verifyNotification(message: string) {
        await allure.step(`Verify notification message "${message}" is displayed`, async () => {
            let xpath = `//div[@role='alert' and normalize-space()='${message}']`;
            await expect(this.page.locator(xpath)).toBeVisible();
        });
    }
    
    async selectCheckboxByLabel(label: string, isCheck: 'check' | 'uncheck') {
        await allure.step(`Select checkbox "${label}" to be "${isCheck}"`, async () => {
            let xpath = `//label[normalize-space()='${label}']/preceding::span[@role='checkbox'][1]`;
            let currentValue = await this.page.locator(xpath).getAttribute('aria-checked');
            if((isCheck == 'check' && currentValue == 'false') || (isCheck == 'uncheck' && currentValue == 'true')) {
                await this.page.locator(xpath).click();
            }
        });
    }
    
    async inputTextById(id: string, value: string){
        await allure.step(`Input text "${value}" in field with id "${id}"`, async () => {
            let selector = `#${id}`;
            let locator = await this.page.locator(selector);
            await locator.clear();
            await locator.fill(value);  
        });
    }
    
    async getInputValueByLabel(label: string) {
        await allure.step(`Get input value from field with label "${label}"`, async () => {
            let xpath1= `//label[normalize-space()='${label}']/following::input[1]`;
            let xpath2= `//label[normalize-space()='${label}']/following::textarea[1]`;
            let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
            return locator.getAttribute('value');
        });
    }
    
    async getTextAreaValueByLabel(label: string) {
        await allure.step(`Get textarea value from field with label "${label}"`, async () => {
            let xpath1= `//label[normalize-space()='${label}']/following::input[1]`;
            let xpath2= `//label[normalize-space()='${label}']/following::textarea[1]`;
            let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
            return locator.textContent();
        });
    }

    async getToken() {
        await allure.step(`Get token from cookies`, async () => {
                    let cookies = await this.page.context().cookies();
        let asidObj = cookies.find(c => c.name == "asid");
        let sidObj = cookies.find(c => c.name == "sid");
        let cookieString = `sid=${sidObj?.value};asid=${asidObj?.value}`;
        return cookieString;
        });
    }
}

