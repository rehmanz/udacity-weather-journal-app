/* Global Variables */
// const weathermap_url = "https://api.openweathermap.org/data/2.5/weather";
// const weathermap_url = "https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=8c7739e6678bc414db460b7f5a6c6c39&units=metric"
// const weathermap_api_key = process.env.OPEN_WEATHER_MAP_API_KEY;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element


/* Function called by event listener */
// postData(url=weathermap_url, data={});

fetch(weathermap_url)
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
      console.log(data);
    });
  }
)
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});

/* Function to GET Web API Data*/
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     // credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     // redirect: 'follow', // manual, *follow, error
//     // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     // body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   console.log(response.json());
//   return response.json(); // parses JSON response into native JavaScript objects
// }


/* Function to POST data */


/* Function to GET Project Data */