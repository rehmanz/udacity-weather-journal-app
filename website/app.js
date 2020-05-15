/**
 * Define Global Variables
 *
 */
const weathermap_api_key = "8c7739e6678bc414db460b7f5a6c6c39";
const weathermap_base_url = "http://api.openweathermap.org/data/2.5/weather?appid=" + weathermap_api_key;


/**
 * End Global Variables
 * Start Helper Functions
 *
 */
/**
 * @description    Gets current date
 * @returns {string} Current date in DD.MM.YYYY format
 */
function getCurrentDate() {
  let d = new Date();
  return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

/**
 * @description    Gets zip code
 * @returns {number} Zip code
 */
function getZipCode() {
  const zipCodeElement = document.getElementById('zip');
  return zipCodeElement.value
}

/**
 * @description    Gets all section IDs from page
 * @returns {list} List of section IDs
 */
const getWeather = async (url= '', zipCode = '') => {
  const weather_query_url = url + "&zip=" + zipCode
  console.log(weather_query_url);
  const request = await fetch(weather_query_url);
  try {
    const allData = await request.json();
    console.log(allData)
  }
  catch(error) {
    //TODO: Print a friendly error message
    console.log("error", error);
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */



/**
 * End Main Functions
 * Begin Events
 *
 */
window.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('generate');
  console.log(form);
  form.addEventListener("click", function() {
    getWeather(weathermap_base_url, getZipCode());
  });
});


