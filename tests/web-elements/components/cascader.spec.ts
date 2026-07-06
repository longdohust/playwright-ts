import test, { expect, Page } from "@playwright/test";

test('Verify select cascader', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    await selectCascaderByLable('Cascader', ['Test', 'With', 'You'], page);

    await expect(page.getByText('Current value: Test, With, You')).toBeVisible();

})

// test('Verify select cascader multiple values', async ({ page }) => {
//     await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
//     await selectCascaderMutipleValueByLable('Cascader multiple values', [['Light', ['Number 0', 'Number 1']], ['Bamboo', 'Little', ['Toy Fish', 'Toy Cards']]], page);

//     //await expect(page.getByText('Current value: Test, With, You')).toBeVisible();

// })

test('Verify select cascader multiple values 2', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    let inputs = [
        {
            path: 'Light',
            children: ['Number 0', 'Number 1']
        },
        {
            path: 'Bamboo->Little',
            children: ['Toy Fish', 'Toy Cards']
        }
    ]
    await selectCascaderMutipleValueByLable('Cascader multiple values', inputs, page);
    await expect(page.getByText("Current value: light, 0light, 1bamboo, little, fishbamboo, little, cards")).toBeVisible();

})



async function selectCascaderByLable(label: string, options: string[] , page: Page) {
    let dropdownXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::input)[1]`;
    await page.locator(dropdownXpath).click();
    for(let option of options) {
        let optionXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${option}']`;
        await page.locator(optionXpath).click();
    }
}


async function selectCascaderMutipleValueByLable(label: string, inputs: any , page: Page) {
    let dropdownXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::input)[1]`;
    await page.locator(dropdownXpath). click();

    for (let input of inputs) {
        if(input.path){
            let pathItems = input.path.split('->');
            for (let pathItem of pathItems) {
                let itemXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${pathItem}']`;
                await page.locator(itemXpath).click();
            }
        }
        for (let child of input.children) {
            let childrenItemXpath= `//li[@role='menuitemcheckbox' and normalize-space()='${child}']`;
            let childItemLocator = page.locator(childrenItemXpath);
            await childItemLocator.locator('.ant-cascader-checkbox').click();
        }
    }
    await page.keyboard.press('Tab');
}

// type NestedCascaderOption = string | NestedCascaderOption[];
// async function selectCascaderMutipleValueByLable(label: string, options: NestedCascaderOption[] , page: Page) {
//     let dropdownXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::input)[1]`;
//     await page.locator(dropdownXpath).click();
//     for(let option of options) {
//         for(let subOption of option) {
//             if(Array.isArray(subOption)) {
//                 for(let subSubOption of subOption) {
//                     let optionXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${subSubOption}']`;
//                     await page.locator(optionXpath).click();
//                 }
//             } else {
//                 let optionXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${subOption}']`;
//                 await page.locator(optionXpath).click();
//             }
//         }
//     }
// }