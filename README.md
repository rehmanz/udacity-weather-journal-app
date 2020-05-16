# Weather Journal App Project
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Table of Contents

* [Requirements](#requirements)
* [Design](#design)
* [Setup](#setup)

## Requirements
Modify the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Design

### Behavior Driven Development (BDD)
Behavior Driven Development (BDD) methodology will be used for
- creating scenarios using [Cucumber.js](https://cucumber.io/docs/installation/javascript/)
- interacting with UI via [Puppeteer](https://pptr.dev/) 

[GitHub Actions](https://help.github.com/en/actions) will be integrated for running automated tests.

### OpenWeather API
[OpenWeather API](https://openweathermap.org/current) used to query weather data.


### Setup
Run the following command to deploy the application:

``` shell script
make all
```

Once deployed

- UI can be accessed at `http://localhost:8080/`
- NodeJS is running at `http://localhost:3000` and logs can be accessed in `app.log` file


For testing:

- Run `make test`
- View individual `<zipCode>.png` file for correct output
