// src/test/interactions/ReportToJira.ts



    // src/test/interactions/ReportToJira.ts

import { actorCalled } from '@serenity-js/core';
import { CallAnApi, LastResponse, PostRequest, Send } from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';

export async function createJiraIssue(errorDescription: string, featureFileName: string, gwtSteps: string) {
    const JIRA_BASE_URL = 'https://learnautomatedtesting.atlassian.net';
    const PROJECT_KEY = 'XSP';
    const ISSUE_TYPE = 'Bug';
    const JIRA_USERNAME = process.env.JIRA_USERNAME || 'your username';
    const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN || 'your api key';


    await actorCalled('JiraReporter')
        .whoCan(CallAnApi.at(JIRA_BASE_URL))
        .attemptsTo(
            Send.a(PostRequest.to('/rest/api/3/issue').with({
                fields: {
                    project: {
                        key: PROJECT_KEY,
                    },
                    summary: `Automated Test Failure in Feature: ${featureFileName} - Unable to Login`,
                    description: {
                        type: 'doc',
                        version: 1,
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: `The following feature file failed: Steps:\n\n${gwtSteps}`
                                    }
                                ]
                            },
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: `The test failed with the following error:\n\n${errorDescription}`
                                    }
                                ]
                            }
                           
                        ]
                    },
                    issuetype: {
                        name: ISSUE_TYPE,
                    },
                },
            }).using({
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                }
            })),
            Ensure.that(LastResponse.status(), equals(201))
        );
}
