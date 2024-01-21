import { useState, useEffect } from 'react'
import weatherService from './../services/weather'

const Countries = ({countriesToShow, showCountry, apikey}) => {

  const [weather, setWeather] = useState([])
  const [didAlready, setdidAlready] = useState(false)

    //get weather
    useEffect(() => {
      if (countriesToShow.length === 1 && didAlready == false) {
        setdidAlready(true)
        // console.log("useEffect for weather")

      weatherService
        .getWeather(countriesToShow[0].capital,apikey)
        .then(initialWeather => {
          setWeather(initialWeather)
        })
    }}, [countriesToShow, apikey])

  if (countriesToShow.length>10) {
    return (
      <>
      Too many matches, specify another filter
      </>
    )   
  }

  if (countriesToShow.length===1 && weather.length != 0) {
    // console.log(weather)
    // console.log(weather.weather)
    // console.log(weather.weather[0].icon)
    return (
      <>
      <h1>{countriesToShow[0].name.common}</h1>
      capital: {countriesToShow[0].capital}<br />
      area: {countriesToShow[0].area} km<sup>2</sup><br />
      <h2>languages:</h2>
      <ul>
        {Object.entries(countriesToShow[0].languages).map(([code, name]) => (
          <li key={code}>{code}: {name}</li>
        ))}
      </ul>
      <h2>flag:</h2>
      <img src={countriesToShow[0].flags.png} alt="Flag" />
      <h2>Weather in {countriesToShow[0].capital}</h2>
      temperature: {weather.main.temp} Kelvins<br />
      <img src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="Weather_icon" /><br />
      wind: {weather.wind.speed} meter/sec<br />
      </>
    )   
  }

  if (didAlready == true){
    setdidAlready(false)
  }

  return (
    <table>
      <tbody>
        {countriesToShow.map(country => (
          <tr key={country.name.common}>
            <td>
              {country.name.common}
              <button onClick = {() => showCountry(country.name.common)} type="submit">Show</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Countries