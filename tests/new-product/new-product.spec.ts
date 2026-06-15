import { test, expect, Page } from '@playwright/test';
import path from 'path';
import process from 'process';

test.beforeEach('Before each test', async({page}) => {
    await page.goto('http://localhost:3000/admin');
});

test('Verify user can creat a new product successfully', async ({page}) => {
    let signInBtn = page.getByRole('button', {name: 'SIGN IN'});
    await expect(signInBtn).toBeVisible();
    await inputTextByLabel('Email*', 'long@gmail.com', page);
    await inputTextByLabel('Password*', '1234567890', page);
    await clickButtonByLabel('SIGN IN', page);
    
    //First case: Must use xpath with class
    await expect(page.locator('//h1[contains(concat(" ", @class, " "), " page-heading-title ")]')).toHaveText('Dashboard');
    //Seconde case: Must use xpath with text
    await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();

    //Creat new product
    await clickMenuItemByLabel('New Product', page);
    await expect(page.locator('//h1[text()="Create a new product"]')).toBeVisible();
    await inputTextByLabel('Product Name*', 'Playwright', page);
    
    const random = new Date().getTime();
    await inputTextByLabel('SKU*', `${random}`, page);
    await inputTextByLabel('Price*', '1000', page);
    await selectProductCategory('Women', page);
    await selectDropdownByLabel('Tax Class*', 'Taxable Goods', page);

    let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    await page.locator(descriptionTypeXpath).click();
    let descriptionContent = `Playwright enables reliable web automation for testing, scripting, and AI agents.`
    await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    await uploadImageByLabel('Media','playwright-ts\\resources\\images\\MagazineRack.PNG', page);
    

    await selectRadioOptionByLabel('Status*', 'Disabled', page);
    await selectRadioOptionByLabel('Visibility*', 'Not visible individually', page);
    await selectRadioOptionByLabel('Manage Stock*', 'Yes', page);
    await selectRadioOptionByLabel('Stock Availability*', 'Out of Stock', page);
   
    await page.locator("#field-qty").fill('10');
    await selectCheckboxByLabel('No shipping required?', 'check', page);
   
    await inputTextByLabel('URL Key*', `${random}`, page);
    await inputTextByLabel('Meta Title*', 'Playwright', page);
    await inputTextByLabel('Meta Description', 'Testing tool for web automation', page);

    await selectDropdownByLabel('Attribute group*', 'Default', page);

    await selectDropdownByLabel('Color', 'Black', page);
    await selectDropdownByLabel('Size', 'XL', page);

    await clickButtonByLabel('Save', page);
    await verifyNotification('Product created successfully', page);
});

async function inputTextByLabel(label: string, value: string, page: Page) {
    let xpath1= `//label[normalize-space()='${label}']/following::input[1]`;
    let xpath2= `//label[normalize-space()='${label}']/following::textarea[1]`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`)
    await locator.click();
    await locator.clear();
    await locator.fill(value);
}

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//button[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

async function clickMenuItemByLabel(label:string, page: Page) {
    let xpath = `//div[contains(concat(' ', @class, ' ' ), ' admin-nav ')]//a[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

async function selectProductCategory(category: string, page: Page) {
    await clickButtonByLabel('Select category', page);
    await page.getByPlaceholder('Search categories').fill(category);
    await page.locator(`//h3[normalize-space()='${category}']/following::button[1][normalize-space()='Select']`).click();
}

async function selectDropdownByLabel(label: string, option: string, page: Page) {
    let dropdownXpath1 = `//label[normalize-space()='${label}']/following::button[1]`;
    let dropdownXpath2 = `//span[normalize-space()='${label}']/following::button[1]`;
    let locator = page.locator(`(${dropdownXpath1} | ${dropdownXpath2})[1]`);
    await locator.click();
    let optionXpath = `//div[@role='option' and normalize-space()='${option}']`;
    await page.locator(optionXpath).click();
};

async function uploadImageByLabel (label: string, filePath: string, page: Page) {
    let uploadFileXpath = `//div[@data-slot='card-title' and normalize-space()='${label}']/following::input[@type='file']`
    await page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), filePath));
}

async function selectRadioOptionByLabel(label: string, option: string, page: Page){
    let xpath = `//div[@role='group' and .//label[normalize-space()='${label}']]//label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
    await page.locator(xpath).click();
}

async function verifyNotification(message: string, page: Page) {
    let xpath = `//div[@role='alert' and normalize-space()='${message}']`;
    await expect(page.locator(xpath)).toBeVisible();
}

async function selectCheckboxByLabel(label: string, isCheck: 'check' | 'uncheck', page: Page) {
    let xpath = `//label[normalize-space()='${label}']/preceding::span[@role='checkbox'][1]`;
    let currentValue = await page.locator(xpath).getAttribute('aria-checked');
    if((isCheck == 'check' && currentValue == 'false') || (isCheck == 'uncheck' && currentValue == 'true')) {
        await page.locator(xpath).click();
    }
}