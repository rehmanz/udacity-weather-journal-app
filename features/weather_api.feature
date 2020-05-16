Feature: Weather API
  Weather Journal API

  Scenario Outline: Add a weather record
    Given a zip code "<zipCode>"
    And my feeling "<feeling>"
    When I make a weather request
    Then I should see temperature, zip code and my feelings
    Examples:
      | zipCode         | feeling                     |
      | 94538           | Feeling warmer than usual.  |
      | 95747           | It is really cold.          |