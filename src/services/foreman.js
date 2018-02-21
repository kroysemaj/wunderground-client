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
              icon: weather.icon_url
            };
            console.log('weather: ', curr)
            return curr;
          })
          .catch( (err)=> console.error(err.message) );
}

function get10Day(){

  const tenDayWeather = wunderground.get10DayForecast(loc);
  return tenDayWeather;
}
