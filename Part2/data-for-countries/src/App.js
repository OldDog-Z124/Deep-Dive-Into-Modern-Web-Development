import axios from "axios"
import { useEffect, useState } from "react"

const Filter = ({value, onChange}) => {
  return (
    <div><p>
        find countries 
        <input type='text' value={value} onChange={onChange} />
    </p></div>
  )
}

const Content = ({countries, showCountry}) => {
  if (countries.length > 10) {
    return (
      <div><p>
        Too many matches, specify another filter
      </p></div>
    )
  }
  else if (countries.length > 1) {
    return (
      <div><ul>
        {countries.map(country => 
          <li key={country.name.official}>
            {country.name.official}
            <button onClick={() => showCountry(country.name.official)}>show</button>
          </li> 
        )}  
      </ul></div> 
    )
  }
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  else {
    return <div></div>
  }
}

const Country = ({country}) => {
  const [weatherInfo, setWeatherInfo] = useState({})

  const languages = Object.entries(country.languages)
  const weatherUrl = `
https://api.openweathermap.org/data/2.5/weather?
lat=${country.capitalInfo.latlng?.[0] ?? country.latlng[0]}&
lon=${country.capitalInfo.latlng?.[1] ?? country.latlng[1]}&
appid=${process.env.REACT_APP_WEATHER_API_KEY}`

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => {
        console.log(response)
        setWeatherInfo(response.data)
      })
  }, [weatherUrl])

  if (JSON.stringify(weatherInfo) === '{}') return null

  const temp = (weatherInfo.main.temp - 273.15).toFixed(2)
  const weatherDesc = weatherInfo.weather[0].description
  const weatherIcon = weatherInfo.weather[0].icon
  const windSpeed = weatherInfo.wind.speed
  
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>capital {country.capital?.[0]}</p>
      <p>area {country.area}</p>
      <div>
        <h3>languages</h3>
        <ul>
          {languages.map(([key, language]) => 
            <li key={key}>{language}</li>
          )}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt="Country Flag" width="200" />
      </div>
      <div>
        <h2>Weather in {country.capital?.[0] ?? country.name.common}</h2>
        <p>temperature {temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDesc} />
        <p>wind {windSpeed} m/s</p>
      </div>
    </div>
  )
}

function App() {
  const [countries, setCountris] = useState([])
  const [filterText, setFilterText] = useState('')

  const url = 'https://restcountries.com/v3.1'

  useEffect(() => {
    axios
      .get(`${url}/all`)
      .then(response => {
        setCountris(response.data)
      })
  }, [])
  
  const countriesToShow = (countries.filter(country => 
    filterText && 
    (
      country.name.common.toLowerCase().includes(filterText.toLowerCase()) || 
      country.name.official.toLowerCase().includes(filterText.toLowerCase())
    )
  ))

  const handleFilter = (event) => {
    setFilterText(event.target.value)
  }

  const showCountry = (name) => {
    setFilterText(name)
  }

  return (
    <div>
      <Filter text={filterText} onChange={handleFilter} />
      <Content countries={countriesToShow} showCountry={showCountry} />
    </div>
      
  )
}

export default App

