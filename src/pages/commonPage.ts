import { expect, Page } from "@playwright/test";
import path from "path";
import { CommonInterface } from "./commonInterface";

export abstract class CommonPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract isOnPage():void;

    async verifyHeaderByText(value: string){
        await expect(this.page.locator(`//h1[contains(concat(" ", @class, " "), " page-heading-title ") and text()='${value}']`)).toBeVisible();
    }
    
    async inputTextByLabel(label: string, value: string) {
        let xpath1= `//label[normalize-space()="${label}"]/following::input[1]`;
        let xpath2= `//label[normalize-space()="${label}"]/following::textarea[1]`;
        let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`)
        await locator.click();
        await locator.clear();
        await locator.fill(value);
    }
    async inputDateByLabel(label: string, value: string) {
        let xpath1= `//label[normalize-space()="${label}"]/following::input[1]`;
        let xpath2= `//label[normalize-space()="${label}"]/following::textarea[1]`;
        let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`)
        await locator.click();
        await locator.clear();
        await this.page.keyboard.type(value);
    }
    
    async clickButtonByLabel(label: string) {
        let xpath = `//button[normalize-space()='${label}']`;
        await this.page.locator(xpath).click();
    }
    
    async clickMenuItemByLabel(label:string) {
        let xpath = `//div[contains(concat(' ', @class, ' ' ), ' admin-nav ')]//a[normalize-space()='${label}']`;
        await this.page.locator(xpath).click();
    }
    
    async selectDropdownByLabel(label: string, option: string) {
        let dropdownXpath1 = `//label[normalize-space()='${label}']/following::button[1]`;
        let dropdownXpath2 = `//span[normalize-space()='${label}']/following::button[1]`;
        let locator = this.page.locator(`(${dropdownXpath1} | ${dropdownXpath2})[1]`);
        await locator.click();
        let optionXpath = `//div[@role='option' and normalize-space()='${option}']`;
        await this.page.locator(optionXpath).click();
    };
    
    async uploadImageByLabel (label: string, filePath: string) {
        let uploadFileXpath = `//div[@data-slot='card-title' and normalize-space()='${label}']/following::input[@type='file']`
        await this.page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), filePath));
    }
    
    async selectRadioOptionByLabel(label: string, option: string){
        let xpath = `//div[@role='group' and .//label[normalize-space()='${label}']]//label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
        await this.page.locator(xpath).click();
    }
    
    async verifyNotification(message: string) {
        let xpath = `//div[@role='alert' and normalize-space()='${message}']`;
        await expect(this.page.locator(xpath)).toBeVisible();
    }
    
    async selectCheckboxByLabel(label: string, isCheck: 'check' | 'uncheck') {
        let xpath = `//label[normalize-space()='${label}']/preceding::span[@role='checkbox'][1]`;
        let currentValue = await this.page.locator(xpath).getAttribute('aria-checked');
        if((isCheck == 'check' && currentValue == 'false') || (isCheck == 'uncheck' && currentValue == 'true')) {
            await this.page.locator(xpath).click();
        }
    }
    
    async inputTextById(id: string, value: string){
        let selector = `#${id}`;
        let locator = await this.page.locator(selector);
        await locator.clear();
        await locator.fill(value);
    }
    
    async getInputValueByLabel(label: string) {
        let xpath1= `//label[normalize-space()='${label}']/following::input[1]`;
        let xpath2= `//label[normalize-space()='${label}']/following::textarea[1]`;
        let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
        return locator.getAttribute('value');
    }
    
    async getTextAreaValueByLabel(label: string) {
        let xpath1= `//label[normalize-space()='${label}']/following::input[1]`;
        let xpath2= `//label[normalize-space()='${label}']/following::textarea[1]`;
        let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
        return locator.textContent();
    }
}

