import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Persons from './components/Persons';
import Nameform from './components/Nameform';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const namemap = persons.map(person => person.name)
    const numbermap = persons.map(person => person.number)
    console.log(namemap)
    if (namemap.includes(newName) || numbermap.includes(newNumber)) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
    else {
      console.log(nameObject)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')}
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  
  const namesToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <Nameform onSubmit={addName}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={namesToShow} />
    </div>
  )

}

export default App
