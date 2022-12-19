Feature: We can run hooks

  Scenario: We run hooks in the correct order
    Given we have a regular scenario
    Then regular hooks should run in order

  @foo
  Scenario: We run a tagged scenario
    Given we have a tagged scenario
    Then all hooks should run in order