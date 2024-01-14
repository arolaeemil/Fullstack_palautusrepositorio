import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0700123123' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}> 
        <div>
          <p>name: <input value = {newName} onChange={handleNameChange}/></p>
          <p>number: <input value = {newNumber} onChange={handleNumberChange}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(person =>
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
