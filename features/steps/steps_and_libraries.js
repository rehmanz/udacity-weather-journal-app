const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

const node_url = "http://localhost:3000"
const weathermap_api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
openweathermap_url = "https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=" +
                      weathermap_api_key + "&units=metric";


/**
 * Steps (Business Flow Layer)
 *
*/
Given('{string} API is operational', function (api_id) {
  var api_url = ""
  if (api_id == "OpenWeather") {
    api_url = openweathermap_url;
  }

  fetch(api_url)
  .then(
    function(response) {
      response.status != 200 && assert.fail("API did not respond.");
    }
  );
});

Given('Node server is operational', function () {
  fetch(node_url)
  .then(
    function(response) {
      response.status != 200 && assert.fail("Node server did not respond.");
    }
  );
});

/**
 * Libraries (Technical Layer)
 * 
*/
function isItFriday(today) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({path: 'example.png'});
  
    await browser.close();
  })();
  return 'Nope';
}
