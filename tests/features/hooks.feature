Feature: We can run hooks

  @foo
  Scenario: We run regular hooks
    Given we have a scenario
    Then all hooks should run
