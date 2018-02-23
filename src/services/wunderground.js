import axios from 'axios';

const API_KEY = '845c01b7b50bde40'; // I know, I know. API key in the client is bad. Mea Culpa.

const defaultCoords = {
  latitude: -33.9249,
  longitude: 18.4241
};

function getCurrentForecast(coords){
  if (!coords){
    console.log("no coords, using defaults");
    coords = defaultCoords;
  }
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${coords.latitude},${coords.longitude}.json`);
}

function get10DayForecast(coords){
  if (!coords){
    console.log("no coords, using defaults");
    coords = defaultCoords;
  }
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/forecast10day/q/${coords.latitude},${coords.longitude}.json`);
}


export default { getCurrentForecast, get10DayForecast }; 