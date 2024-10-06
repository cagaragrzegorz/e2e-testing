Feature: Verification of ToDo app basic functionality

  Scenario: Should load application
    When User opens ToDo application
    Then Application should load on with proper url
    And Title is visible

  Scenario: Should add task
    When User opens ToDo application
    Then There are no tasks
    When User adds task "First Task"
    Then There are 1 tasks in todo
    And Counter shows 1 active tasks

  Scenario: Should add multiple tasks
    When User opens ToDo application
    Then There are no tasks
    When User adds task "First Task"
    And User adds task "Second Task"
    And User adds task "Third Task"
    Then There are 3 tasks in todo
    And Counter shows 3 active tasks

  Scenario: Should complete tasks
    When User opens ToDo application
    And User adds task "First Task"
    And User adds task "Second Task"
    And User completes "First Task"
    Then There are 2 tasks in todo
    And Counter shows 1 active tasks
    And There are 1 completed tasks in to do