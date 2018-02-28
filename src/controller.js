import location from './services/location';
import wunderground from './services/wunderground';

export default { getCurrent, get10Day, geoLookup };

function getCurrent(){
  return  location()
            .then( currrentConditionsSuccess, currentConditionsReject) 
            .then ( prepareCurrentData )
            .catch( (err)=> console.error(err.message) );
}

function get10Day(){
  return  location()
            .then( tenDaySuccess, tenDayReject)
            .then( prepare10DayData )
            .catch( (err) => console.error(err) );
}

function geoLookup(){
  return  location()
            .then( geoCodeSuccess, geoCodeReject) 
            .then( prepareLookupData )
            .catch( (err) => console.error(err) );
}

/* CALLBACKS */
/* Current Conditions */
function currrentConditionsSuccess(position){
  return wunderground.getCurrentForecast(position.coords);
}

function currentConditionsReject() {
  return wunderground.getCurrentForecast(); //On a locations rejection, call using default coords
}

function prepareCurrentData(response) {
  const weather = response.data.current_observation;
  return {
    temp: parseInt(weather.temp_f, 10),
    feelLike: parseInt(weather.feelslike_f),
    icon: weather.icon_url,
    iconText: weather.icon,
  };
}

/* 10 day forecast */
function tenDaySuccess(position) {
  return wunderground.get10DayForecast(position.coords);
}

function tenDayReject() {
  return wunderground.get10DayForecast(); //On a locations rejection, call using default coords
}

function prepare10DayData(response) {
  const forecasts = response.data.forecast.simpleforecast.forecastday;
  return forecasts.map( ( forecast ) => {
    return {
      period: forecast.period,
      epoch: forecast.date.epoch,
      date: forecast.date.weekday_short,
      low: forecast.low.fahrenheit,
      high: forecast.high.fahrenheit,
      icon: forecast.icon_url,
      iconText: forecast.icon
    };
  });
}

/* Geolookup */
function geoCodeSuccess(position){
  return wunderground.getLocationFromCoords(position.coords);
}

function geoCodeReject() {
  return wunderground.getLocationFromCoords(); //On a locations rejection, call using default coords
}

function prepareLookupData(response) {
  const locationData = response.data.location;
  let location = {
    city: locationData.city
  }
  if(locationData.country_name !== 'USA'){
    location.state = locationData.country_name; // for international cities, "state" becomes country. Ex Paris, France
  } else {
    location.state = locationData.state;
  }
  return location; 
}