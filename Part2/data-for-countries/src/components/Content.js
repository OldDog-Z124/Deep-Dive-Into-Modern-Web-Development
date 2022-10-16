import Country from "./Country"

const Content = ({countries, filter, setFilter}) => {
  const filterCountries = countries.filter(country => (
    filter &&
    (
      country.name.common.toLowerCase().includes(filter.toLowerCase()) || 
      country.name.official.toLowerCase().includes(filter.toLowerCase())
    )
  ))

  const show = (countryName) => {
    setFilter(countryName)
  }


  if (filterCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (filterCountries.length > 1) {
    return (
      <div><ul>
        {filterCountries.map(country => 
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => show(country.name.official)}>show</button>
          </li>
        )}
      </ul></div>
    )
  }
  else if (filterCountries.length === 1) {
    return (
      <Country country={filterCountries[0]} />
    )
  }
}

export default Content