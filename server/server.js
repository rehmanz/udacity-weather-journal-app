// Setup empty JS object to act as endpoint for all routes
projectData = []

const weathermap_url = "https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=8c7739e6678bc414db460b7f5a6c6c39&units=metric"
const weathermap_api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
console.log(weathermap_api_key);

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Spin up the server
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
  console.log(projectData);
  res.send(projectData);
});

// Post Route
app.post('/', addWeather);

function addWeather (req, res) {
  console.log(req.body);
  projectData.push(req.body)
  console.log(projectData);
};

app.get('/weather', function(req, res) {
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
});