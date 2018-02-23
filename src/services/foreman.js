import location from './location';
import wunderground from './wunderground';

export default { getCurrent, get10Day, geoLookup };

function getCurrent(){
  console.log('getting current');
  return  location()
            .then( currrentConditionsSuccess, currentConditionsReject) 
            .then ( prepareCurrentData )
            .catch( (err)=> console.error(err.message) );
}


function get10Day(){
  console.log('getting 10 day');
  return  location()
            .then( tenDaySuccess, tenDayReject)
            .then( prepare10DayData )
            .catch( (err) => console.error(err) );
}

function geoLookup(){
  console.log('getting location');
  return  location()
            .then( 
              (position) => {
                return wunderground.getLocationFromCoords(position.coords);
              }, 
              () => wunderground.getLocationFromCoords() ) //On a locations rejection, call using default coords
              .then( (response) => {
              const locationData = response.data.location;
              return prepareLookupData(locationData);
            })
            .catch( (err) => console.error(err) );
          }

          function prepareLookupData(locationData) {
            console.log("Location Data: ", locationData);
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

/* Getting Current Conditions callbacks */
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
    feelLike: weather.feelslike_f,
    icon: weather.icon_url,
    iconText: weather.icon,
  };
}

/* Getting the 10 day forecast callbacks */
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