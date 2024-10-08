// features/step-definitions/jira.steps.ts

import { Given, When, Then } from '@cucumber/cucumber';
import { Actor } from '@serenity-js/core';
import { Navigate, PageElement, Click, isSelected, isVisible, Text } from '@serenity-js/web';
import { Ensure, equals } from '@serenity-js/assertions';
import { By } from '@serenity-js/web';
import { createJiraIssue } from '../../test/interactions/ReportToJira';

// Define locators for checkboxes and icons
const FirstCheckbox = PageElement.located(By.css('[for="checkbox1"]')).describedAs('first checkbox');
const SecondCheckbox = PageElement.located(By.css('[for="checkbox2"]')).describedAs('second checkbox');
const SmileyIconForFirst = PageElement.located(By.css('label[for="checkbox1"] .icon')).describedAs('smiley icon for first checkbox');
const SmileyIconForSecond = PageElement.located(By.css('label[for="checkbox2"] .icon')).describedAs('smiley icon for second checkbox');

// Step to navigate to the Checkboxes page
Given('{actor} navigates to the Checkboxes page', async (actor: Actor) =>
    actor.attemptsTo(
        Navigate.to('https://practiceautomatedtesting.com/webelements/Checkboxes')
    )
);

// Step to check the first checkbox, ensuring visibility with Ensure
When('{pronoun} checks the first checkbox', async (actor: Actor) =>
    actor.attemptsTo(
        Ensure.that(FirstCheckbox, isVisible()),  // Ensure the checkbox is visible
        Click.on(FirstCheckbox)                   // Click the checkbox once visible
    )
);

// Step to verify that the first checkbox is checked and displays a smiley face
Then('{pronoun} should see that the first checkbox is checked with a smiley icon', async (actor: Actor) => {
    const featureFileName = 'Checkbox.feature';  // Feature file name for reference
    const gwtSteps = `
      Given the user navigates to the Checkboxes page
      When the user checks the first checkbox
      Then the user should see that the first checkbox is checked with a smiley icon
    `;
    
    try {
        await actor.attemptsTo(
            Ensure.that(FirstCheckbox, isSelected()),               // Ensure the first checkbox is selected
            Ensure.that(Text.of(SmileyIconForFirst), equals('😊'))  // Ensure the smiley icon shows a happy face
        );
    } catch (error) {
        console.error('Test failed:', error.message);
        await createJiraIssue(error.message, featureFileName, gwtSteps);  // Pass the error message, feature file name, and GWT steps
    }
});

// Step to check the second checkbox, ensuring visibility with Ensure
When('{pronoun} checks the second checkbox', async (actor: Actor) =>
    actor.attemptsTo(
        Ensure.that(SecondCheckbox, isVisible()),  // Ensure the checkbox is visible
        Click.on(SecondCheckbox)                   // Click the checkbox once visible
    )
);

// Step to verify that the second checkbox is checked and displays a sad face
Then('{pronoun} should see that the second checkbox is checked with a sad icon', async (actor: Actor) => {
    const featureFileName = 'Checkbox.feature';  // Feature file name for reference
    const gwtSteps = `
      Given the user navigates to the Checkboxes page
      When the user checks the second checkbox
      Then the user should see that the second checkbox is checked with a sad icon
    `;
    
    try {
        await actor.attemptsTo(
            Ensure.that(SecondCheckbox, isSelected()),                // Ensure the second checkbox is selected
            Ensure.that(Text.of(SmileyIconForSecond), equals('😊'))   // Ensure the smiley icon shows a sad face
        );
    } catch (error) {
        console.error('Test failed:', error.message);
        await createJiraIssue(error.message, featureFileName, gwtSteps);  // Pass the error message, feature file name, and GWT steps
    }
});
