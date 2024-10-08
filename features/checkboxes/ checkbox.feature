Feature: Checkbox interaction with smiley icons

  In order to validate the behavior of checkboxes with corresponding smiley icons
  As a user
  I want to verify that selecting a checkbox displays the correct smiley icon

  Background:
    Given Alice navigates to the Checkboxes page

  Scenario: Checking the first checkbox displays a smiley face
    When she checks the first checkbox
    Then she should see that the first checkbox is checked with a smiley icon

  Scenario: Checking the second checkbox displays a sad face
    When she checks the second checkbox
    Then she should see that the second checkbox is checked with a sad icon
