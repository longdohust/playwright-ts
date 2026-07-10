import test, { expect, Page } from "@playwright/test";

test('Verify select rating', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop');
    await dragAndDrop('Drag n Drop', ['Apple', ' Peach'], 'right', page)
    await page.waitForTimeout(2000);


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