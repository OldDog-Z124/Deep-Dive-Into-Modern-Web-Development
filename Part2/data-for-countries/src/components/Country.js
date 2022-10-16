import Weather from './Weather'

const Country = ({country}) => {
  const languages = Object.entries(country.languages)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
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
      <Weather site={country.capital} lat={country.capitalInfo.latlng?.[0]} lon={country.capitalInfo.latlng?.[1]} />
    </div>
  )
}

export default Country