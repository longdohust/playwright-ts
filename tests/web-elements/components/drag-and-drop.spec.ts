import test, { expect, Page } from "@playwright/test";

test('Verify select rating', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop');
    let inputs = ['Apple', 'Peach'];
    await dragAndDrop('Drag n Drop', inputs, 'right', page);
    let sourcePanelItems = await getPanelItemsByLabel('Drag n Drop', 'Source', page);
    let targetPanelItems = await getPanelItemsByLabel('Drag n Drop', 'Target', page);
    expect(isSubArray(sourcePanelItems, inputs)).toBeFalsy();
    expect(isSubArray(targetPanelItems, inputs)).toBeTruthy();
    inputs = ['Mango', 'Grapes'];
    await dragAndDrop('Drag n Drop', inputs, 'left', page);
    sourcePanelItems = await getPanelItemsByLabel('Drag n Drop', 'Source', page);
    targetPanelItems = await getPanelItemsByLabel('Drag n Drop', 'Target', page);
    expect(isSubArray(sourcePanelItems, inputs)).toBeTruthy();
    expect(isSubArray(targetPanelItems, inputs)).toBeFalsy();

});

async function dragAndDrop( label: string, inputs:string[], direction:'left' | 'right', page: Page ){
    let spaceXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-space ')])[1]`
    let spaceLocator = page.locator(spaceXpath);
    let sourcePanelCss = direction == 'right' ? '.border-teal-500' : '.border-orange-500';
    let sourcePanelLocator = spaceLocator.locator(sourcePanelCss);

    let targetPanelCss = direction == 'right' ? '.border-orange-500' : '.border-teal-500';
    let targetPanelLocator = spaceLocator.locator(targetPanelCss);
    for(let input of inputs){
        let itemXpath = `//button[normalize-space()='${input}']`;
        await sourcePanelLocator.locator(itemXpath).dragTo(targetPanelLocator);
    }
};

async function getPanelItemsByLabel(label: string, panel: 'Source' | 'Target', page: Page){
    let spaceXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-space ')])[1]`;
    let spaceLocator = page.locator(spaceXpath);
    let currentPanel = panel == 'Source' ? '.border-teal-500' : '.border-orange-500';
    let panelLocator = spaceLocator.locator(currentPanel);
    let items = await panelLocator.getByRole('button').allTextContents();
    return items;
}

function isSubArray(parent: string[], subArray: string[]){
    return subArray.every(el => parent.includes(el));
}
