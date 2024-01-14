import { useState } from 'react'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '0700123123' }
  // ]) 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
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
    // setPersons(persons.concat(nameObject))
    // setNewName('')
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

  const Name = ({ person }) => {
    return (
      // <li>{person.name}</li>
      <>{person.name}</>
    )
  }

  const Number = ({ person }) => {
    return (
      // <li>{person.name}</li>
      <>{person.number}</>
    )
  }
  
  const namesToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form>
          Filter shown with <input value = {newFilter} onChange={handleFilterChange}/>
        </form>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}> 
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {/* {persons.map(person => */}
          {namesToShow.map(person =>
          <tr key={person.name}>
            <td>
              <Name person={person} /> &nbsp;
              <Number person={person} />
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}



export default App
