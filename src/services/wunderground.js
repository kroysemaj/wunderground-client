import axios from 'axios';

let current = {};
let tenDay  = {};

async function getCurrentForecast(){
  const result = await axios.get('http://reddit.com/.json')
  return Object.assign(current, result.data.data);
}

async function get10DayForecast(){
  const result = await axios.get('http://reddit.com/.json')
  return Object.assign(tenDay, result.data.data);
}

export default { getCurrentForecast, get10DayForecast }; 