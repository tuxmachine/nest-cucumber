Feature: Scenario-scoped test suites

  Scenario Outline: Every scenario receives a fresh Suite instance
    Given we are calculating a <operator>
    And we have an input number <left>
    And we have an input number <right>
    When we perform the calculation
    Then it should return <result>

  Examples:
      | operator       | left | right | result |
      | addition       | 1    | 2     | 3      |
      | subtraction    | 1    | 2     | -1     |
      | division       | 6    | 2     | 3      |
      | multiplication | 2    | 2     | 4      |
