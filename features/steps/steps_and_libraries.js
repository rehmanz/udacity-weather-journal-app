const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');

/**
 * Steps (Business Flow Layer)
 *
*/
Given('today is Sunday', function () {
  this.today = 'Sunday';
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
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