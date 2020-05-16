/**
 * Define Global Variables
 *
 */
const weatherMapAPIKey = "8c7739e6678bc414db460b7f5a6c6c39";
const weatherMapBaseURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + weatherMapAPIKey;
const backendUrl = "http://localhost:3000"

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
/**
 * @description       Gets current date
 * @returns {string}  Current date in DD.MM.YYYY format
 */
function getCurrentDate() {
  let d = new Date();
  return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

/**
 * @description       Gets zip code
 * @returns {string}  Zip code
 */
function getZipCode() {
  const zipCodeElement = document.getElementById('zip');
  //TODO: Check if value is missing
  return zipCodeElement.value
}

/**
 * @description       Gets user response
 * @returns {string}  User response
 */
function getUserResponse() {
  const textInputElement = document.getElementById('feelings');
  //TODO: Check if value is missing
  return textInputElement.value
}

/**
 * @description     Gets weather data
 * @param {string}  Open Weather Map URL
 * @param {string}  Zip Code
 * @returns {Map}   Weather data
 */
const getWeather = async (url= '', zipCode = '') => {
  const weather_query_url = url + "&zip=" + zipCode
  const request = await fetch(weather_query_url);
  try {
    const weatherData = await request.json();
    return weatherData;
  }
  catch(error) {
    //TODO: Print a friendly error message
    console.log("error", error);
  }
}

/**
 * @description       Update UI
 * @param {string}    Date
 * @param {string}    Temperature
 * @param {string}    Content
 */
function updateUI(date, temperature, content) {
  // TODO: Optimize this code by creating element struct
  document.getElementById('date').innerText = date;
  document.getElementById('temp').innerText = temperature;
  document.getElementById('content').innerText = content;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
/**
 * @description     Post data
 * @param {string}  Backend URL
 * @param {Map}     Weather data map
 */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }
};

/**
 * @description     Gets weather data and posts to NodeJS backend
 * @param {string}  Open Weather Map URL
 * @param {string}  Zip Code
 * @param {string}  User Response
 */
function getPostWeather(url='', zipCode='', userResponse='') {
  getWeather(url, zipCode)
    .then(function(weatherData={}) {
      //TODO: Check if temperature key is missing
      const data = {
        'temperature'   : weatherData.main.temp,
        'date'          : getCurrentDate(),
        'user_response' : getUserResponse()
      }
      return data;
    })
    .then(function (data={}) {
      console.log(data);
      postData(backendUrl+'/', data);
      return data;
    })
    .then(function (data={}) {
      updateUI(data.date, data.temperature, data.user_response);
    });
}

/**
 * End Main Functions
 * Begin Events
 *
 */
window.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('generate');
  console.log(form);
  form.addEventListener("click", function() {
    getPostWeather(weatherMapBaseURL, getZipCode(), getUserResponse());
  });
});