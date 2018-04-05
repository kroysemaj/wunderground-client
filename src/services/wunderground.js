import axios from 'axios';

const API_KEY = '845c01b7b50bde40'; // I know, I know. API key in the client is bad. Mea Culpa.

const defaultCoords = { 
  // latitude: 21.3069, // Honolulu, HI
  // longitude: -157.8583
  latitude: 51.4545,  // international test data. Bristol, UK
  longitude: -2.5879
};

function getCurrentForecast(coords){
  if (!coords){
    coords = defaultCoords;
  }
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${coords.latitude},${coords.longitude}.json`);
}

function getCurrentForecastWithZip(zipCode){
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${zipCode}.json`);
}

function get10DayForecast(coords){
  if (!coords){
    coords = defaultCoords;
  }
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/forecast10day/q/${coords.latitude},${coords.longitude}.json`);
}

function getLocationFromCoords(coords){
  if(!coords){
    coords = defaultCoords;
  }
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/geolookup/q/${coords.latitude},${coords.longitude}.json`);
}

export default { getCurrentForecast, get10DayForecast, getLocationFromCoords, getCurrentForecastWithZip }; 