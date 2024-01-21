import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (capital, apikey) => {
    const request = axios.get(baseUrl + capital + '&appid=' + apikey)
    return request.then(response => response.data)
  }
  
export default { 
  getWeather: getWeather
}