import {useState, useEffect} from "react"
import axios from "axios"

import Filter from "./components/Filter"
import Content from "./components/Content"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Content countries={countries} filter={filter} setFilter={setFilter} />
    </div>    
  )
}

export default App
