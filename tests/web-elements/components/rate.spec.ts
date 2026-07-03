import test, { expect, Page } from "@playwright/test";

test('Verify select rating', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
    await selectRateByLable('Rate', '3', page);
    await expect(page.getByText('Current rating: normal')).toBeVisible();

})

async function selectRateByLable(label: string, rating:string , page: Page) {
    let xpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text ') and normalize-space()='${label}']/following::div[@aria-posinset='${rating}'])[1]`;
    let locator = page.locator(xpath);
    let curentStatus = await locator.getAttribute('aria-checked');
    if(curentStatus != 'true') {
        await locator.click();
    }

}

test('Verify select half rating', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
    await selectHalfRateByLable('Haft Rate', '3', page);
    await expect(page.getByText('Current rating: 3')).toBeVisible();

})

async function selectHalfRateByLable(label: string, rating:string , page: Page) {
    let ceiledRating = Math.ceil(Number.parseFloat(rating));
    let starXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text ') and normalize-space()='${label}']/following::li[.//div[@aria-posinset='${ceiledRating}']])[1]`;
    let locator = page.locator(starXpath);

    if(ceiledRating == Number.parseFloat(rating)){
        let fullStarLocator = page.locator(`(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text ') and normalize-space()='${label}']/following::li[.//div[@aria-posinset='${ceiledRating}']])[1]`);
        let currentStatus = await fullStarLocator.getAttribute('aria-checked');
        if(currentStatus != 'true') {
            await fullStarLocator.click();
        }
    }
    else {
        let className = await locator.getAttribute('class');
        if(!`${className}`.includes(' ant-rate-star-half ')){
            await locator.locator(".ant-rate-star-first").click();
        }
    }
}