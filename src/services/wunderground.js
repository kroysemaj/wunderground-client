import axios from 'axios';

let current = {};
let tenDay  = {};
const API_KEY = '845c01b7b50bde40'; // I know, I know. API key in the client is bad. Mea Culpa.

function getCurrentForecast(coords){
  console.log(coords);
  return axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${coords.latitude},${coords.longitude}.json`);
  
}

async function get10DayForecast(){
  const result = await axios.get('http://reddit.com/.json')
  return Object.assign(tenDay, result.data.data);
}


export default { getCurrentForecast, get10DayForecast }; 