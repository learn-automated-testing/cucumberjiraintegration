import { configure } from '@serenity-js/core';

configure({
    crew: [
        '@serenity-js/serenity-bdd',  // Required: Register SerenityBDDReporter for Serenity BDD JSON reports
        [ '@serenity-js/core:ArtifactArchiver', {
            outputDirectory: 'target/site/serenity',  // Ensure the JSON reports are saved in this directory
        }],
    ],
});