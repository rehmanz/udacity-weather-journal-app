Feature: Weather API
  Weather API added to server

  Scenario: Add a weather record
    Given Open Weather API is operational
    When I post weather data
    Then I should get a 201 response