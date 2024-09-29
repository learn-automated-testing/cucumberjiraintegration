import { BeforeAll, AfterAll ,Given, Then, After } from '@cucumber/cucumber';
import { configure } from '@serenity-js/core';
import { actorCalled } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { By, Navigate, PageElement, Text } from '@serenity-js/web';
import { Ensure, equals } from '@serenity-js/assertions';
import { Browser, chromium } from 'playwright';




// Configure Serenity/JS crew members in a BeforeAll hook
BeforeAll(() => {
    configure({
        crew: [
            '@serenity-js/serenity-bdd',  // Required: Generates Serenity BDD JSON reports
            [ '@serenity-js/core:ArtifactArchiver', {
                outputDirectory: 'target/site/serenity',  // Path to store JSON reports
            }],
        ],
    });
});
// Create a reusable object for your Home Page
const HomePage = {
  title: () =>
    PageElement.located(By.css('h1')).describedAs('title')  // Example selector, change to actual selector
};

let browser: Browser;  // Global browser instance for sharing across steps

// Step to open the Learn Automated Testing portal using Playwright and BrowseTheWebWithPlaywright
Given('I open the Learn Automated Testing portal', async () => {
    browser = await chromium.launch({ headless: false });  // Launch browser (headless mode if needed)

    // Create an actor and provide the Playwright browsing ability
    await actorCalled('Wendy')
        .whoCan(BrowseTheWebWithPlaywright.using(browser))
        .attemptsTo(
            Navigate.to('https://learnautomatedtesting.com')  // Navigate to the portal
        );
});

// Step to verify that the portal's homepage has loaded
Then('I should see the portal homepage', async () => {
    await actorCalled('Wendy')
        .attemptsTo(
            Ensure.that(Text.of(HomePage.title()), equals('The blog and guided path for testautomation experts')),  // Check for homepage title
        );
});

// Cleanup browser instance after each scenario
After(async () => {
    if (browser) {
        await browser.close();  // Close the browser after each scenario
    }
});

// Add AfterAll hook to clean up any resources (e.g., browser)
AfterAll(async () => {
    // Any global cleanup logic
});
