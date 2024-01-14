import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      // important: true,
      // id: persons.length + 1,
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Name = ({ person }) => {
    return (
      // <li>{person.name}</li>
      <>{person.name}</>
    )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}> 
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          // <li key={person.name}> {person.name} </li>
          <tr><Name key={person.name} person={person} /></tr>
        )} 
    </div>
  )

}



export default App
