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
    const namemap = persons.map(person => person.name)
    console.log(namemap)
    if (namemap.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')}
    // setPersons(persons.concat(nameObject))
    // setNewName('')
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
      <table>
        <tbody>
          {persons.map(person =>
          <tr key={person.name}>
            <td><Name person={person} /></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}



export default App
