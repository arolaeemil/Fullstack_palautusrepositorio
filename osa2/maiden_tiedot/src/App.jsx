import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
// import weatherService from './services/weather'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)
  const apikey = import.meta.env.VITE_SOME_KEY

  //console.log(apikey)

  //country list
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const showCountry = (name) => {
    setNewFilter(name)
  }

  const countriesToShow = showAll
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Find countries!</h1>
      <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
      </div>
      <Countries countriesToShow={countriesToShow} showCountry={showCountry} apikey = {apikey}/>
    </div>
  )
}

export default App
