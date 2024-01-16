import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Persons from './components/Persons';
import Nameform from './components/Nameform';
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }
  
  // useEffect(hook, [])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    // if (namemap.includes(newName) || numbermap.includes(newNumber)) {
    //   alert(`${newName} or ${newNumber} is already added to phonebook`)
    // }
    if (numbermap.includes(newNumber)) {
      alert(`${newNumber} is already belongs to someone in the phonebook!`)
    }
    else if (namemap.includes(newName)) {
      const prevPerson = persons.find(person => person.name === newName)
      const personID = prevPerson.id
      const changedPerson = { ...prevPerson, number: newNumber }
      console.log(changedPerson)
      console.log(persons)
      if (window.confirm(newName + " is already in the phonebook. Replace the old number with new one?")) {
        // window.open(
          personService
          .update(personID, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== personID ? person : response))
            //, console.log(response)
          })
          .catch(error => {
            // Handle errors if necessary
            console.error("Error updating person:", error);
          })
          // )
      }  
    }
    else {
      console.log(nameObject)
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))}
        )}
      setNewName('')
      setNewNumber('')
          // axios
          // .post('http://localhost:3001/persons', nameObject)
          // .then(response => {
          //   // console.log(response)
          //   setPersons(persons.concat(response.data))
          //   setNewName('')
          //   setNewNumber('')
          // }
          // )}
      // setPersons(persons.concat(nameObject))
      // setNewName('')
      // setNewNumber('')}
      console.log(persons)
  }

  const deletePerson = (id) => {
    const toBeDeleted = persons.filter(person => person.id === id)
    if (window.confirm("Delete " + toBeDeleted[0].name + "!?")) {
      // window.open(
    // event.preventDefault()
    personService
    .delPerson(id)
    // .then(returnedPersons => {console.log(returnedPersons)})
    .then(() => {setPersons((prevPersons) => prevPersons.filter(person => person.id !== id))
    })
    // )
  }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
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
      <Persons personsToShow={namesToShow} submitDelete={deletePerson}/>
    </div>
  )

}

export default App
