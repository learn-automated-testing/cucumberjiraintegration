import { Given, Then, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';

let browser;
let page;

Given('I open the Learn Automated Testing portal', { timeout: 60 * 1000 }, async () => {  // 60 seconds timeout
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://learnautomatedtesting.com');  // Replace with actual URL
});

Then('I should see the portal homepage', async () => {
    const currentUrl = await page.url();
    if (currentUrl !== 'https://learnautomatedtesting.com/') {
        throw new Error(`Expected to be on https://learnautomatedtesting.com but was on ${currentUrl}`);
    }
});

After(async () => {
    if (browser) {
        await browser.close();
    }
});
