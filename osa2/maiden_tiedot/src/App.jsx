import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      // .then(response => {
      //   setNotes(response.data)
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
      <Countries countriesToShow={countriesToShow} showCountry={showCountry}/>
    </div>
  )
}

export default App
