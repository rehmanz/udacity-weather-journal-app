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
 * @description    Gets all section IDs from page
 * @returns {list} List of section IDs
 */
const getWeather = async (url= '') => {
  console.log(url);
  const request = await fetch(url);
  try {
    const allData = await request.json()
    console.log(allData);
  }
  catch(error) {
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
    getWeather(url=weathermap_base_url+"&id=2172797");;
  });
});


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Event listener to add function to existing HTML DOM element */


/* Function called by event listener */

/* Function to GET Web API Data */

/* Function to POST data */


/* Function to GET Project Data */


