import location from './location';
import wunderground from './wunderground';

export default { getCurrent, get10Day };

let loc;

function getCurrent(){
  console.log('getting current');
  return  location()
          .then( (position) => {
            console.log( 'position: ', position);
            return wunderground.getCurrentForecast(position.coords);
          })
          .then ((response) => {
            const weather = response.data.current_observation;
            const curr =  {
              temp: parseInt(weather.temp_f, 10),
              feelLike: weather.feelslike_f,
              icon: weather.icon_url,
              iconText: weather.icon,
            };
            console.log('weather: ', curr)
            return curr;
          })
          .catch( (err)=> console.error(err.message) );
}

function get10Day(){
  console.log('getting 10 day');
  return  location()
          .then( (position) => {
            console.log('position: ', position);
            return wunderground.get10DayForecast(position.coords);
          })
          .then( (response) => {
            const forecasts = response.data.forecast.simpleforecast.forecastday;
            return forecasts;
          })
          .catch( (err) => console.error(err) );
}
