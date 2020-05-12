const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Global variables
const projectData = []
const weathermap_api_key = process.env.OPEN_WEATHER_MAP_API_KEY;
const port = 3000;

// Setup express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Spin server
const server = app.listen(port, listening);
function listening(){
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