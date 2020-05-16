const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

const webServer = "http://localhost:8080"
const backendURL = "http://localhost:3000"
const weatheMapAPIKey = process.env.OPEN_WEATHER_MAP_API_KEY;
openWeatherMapURL = "https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=" +
                      weatheMapAPIKey + "&units=metric";


/**
 * Steps (Business Flow Layer)
 *
*/
Given('a zip code {string}', function (zipCode) {
  this.zipCode = zipCode;
});

Given('my feeling {string}', function (feeling) {
  this.feeling = feeling;
});

When('I make a weather request', function() {
  weatherRequest(this.zipCode, this.feeling);
});

Then('I should see temperature, zip code and my feelings', function() {
  // TODO: Implement
});

/**
 * Libraries (Technical Layer)
 * 
*/

/**
 * @description       Interacts with UI to submit zip code and feeling
 * @param {string}    Zip Code
 * @param {string}    User Response
 * @returns {string}  Browser snapshot stored as <zipCode>.png
 */
function weatherRequest(zipCode, feeling) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(webServer);
    await page.waitForSelector('#zip');
    await page.type('input#zip', zipCode)
    await page.type('textarea#feelings', feeling);
    await page.click('button#generate');
    await page.screenshot({path: zipCode+'.png'});
    await browser.close();
  })();
}
