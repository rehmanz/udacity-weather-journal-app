const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

/**
 * Steps (Business Flow Layer)
 *
*/
Given('Open Weather API is operational', function () {
  return true;
});

When('I post weather data', function () {
  //TODO: Implement
  this.actualAnswer = 201;
  // this.actualAnswer = isItFriday(this.today);
});

Then('I should get a {int} response', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
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
