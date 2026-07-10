import {test, expect, Page } from '@playwright/test';
import { expectedTableData } from './table-test-data';

test('Verify select option  in auto complete field', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/table');
    let tableData = await getTableDataByLable('Table',['Name', 'Address', 'Age', 'Tags'], page);
    expect(sortJson(tableData)).toMatchObject(sortJson(expectedTableData));
})

async function getTableDataByLable(label: string, expectedFields: string[], page: Page){
    let tableXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text ') and normalize-space()='${label}']/following::table)[1]`;
    let tableLocator = page.locator(tableXpath);
    await page.waitForTimeout(1000);
    let headers = await tableLocator.locator('//th').allTextContents();
    let headerObjects: any = {};
    for(let i = 0; i < headers.length; i++){
        headerObjects[`${headers[i]}`] = i;
    }
    let nextBtn = page.locator('.ant-pagination-item-link .anticon-right');
    let isNext = true;
    let data = [];
    do{
        let rows = await tableLocator.locator('//tbody//tr').all();
        for(let row of rows){
            let cells = await row.locator('//td').all();
            let obj: any = {};
            for(let fieldName of expectedFields){
                if(fieldName == 'Tags') {
                    let tags = await cells[headerObjects[fieldName]].locator('//span').allTextContents();
                    obj['Tags'] = tags;
                }
                else {
                    obj[fieldName] =  await cells[headerObjects[fieldName]].textContent();
                }
            }
            data.push(obj);    
        }
        let currentStatus = await nextBtn.isDisabled();
        isNext = !currentStatus;
        if(isNext){
            await nextBtn.click();
        }
    }while(isNext); 
    return data;
}

function sortJson(value: any): any {
    // Array → sort values
    if (Array.isArray(value)) {
        return value
            .map(sortJson)
            .sort((a, b) => {
                return JSON.stringify(a).localeCompare(JSON.stringify(b));
            });
    }

    // Object → sort keys
    if (value !== null && typeof value === "object") {
        const sorted: { [key: string]: any } = {};
        Object.keys(value)
            .sort()
            .forEach(key => {
                sorted[key] = sortJson(value[key]);
            });
        return sorted;
    }

    return value;
}