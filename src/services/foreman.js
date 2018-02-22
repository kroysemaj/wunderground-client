import location from './location';
import wunderground from './wunderground';

export default { getCurrent, get10Day };

function getCurrent(){
  console.log('getting current');
  return  location()
          .then( (position) => {
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
            return wunderground.get10DayForecast(position.coords);
          })
          .then( (response) => {
            const forecasts = response.data.forecast.simpleforecast.forecastday;
            const tenDay = forecasts.map( ( forecast ) => {
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
            return tenDay;
          })
          .catch( (err) => console.error(err) );
}
