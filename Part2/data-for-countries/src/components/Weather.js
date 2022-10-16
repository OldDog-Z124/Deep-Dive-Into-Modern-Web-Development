import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({site ,lat, lon}) => {
  const [weatherinfo, setWeatherinfo] = useState({})

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeatherinfo(response.data)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [lat, lon])

  if (!site) {
    return (
      <div>
        <h3>There is no capital</h3>
      </div>
    )
  }

  if (JSON.stringify(weatherinfo) === '{}') return

  const temp = (weatherinfo.main.temp - 273.15).toFixed(2)
  const weatherDesc = weatherinfo.weather[0].description
  const weatherIcon = weatherinfo.weather[0].icon
  const windSpeed = weatherinfo.wind.speed

  return (
    <div>
      <h3>Weather in {site}</h3>
      <p>temperature {temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDesc} />
      <p>wind {windSpeed} m/s</p>
    </div>
  )
}

export default Weather