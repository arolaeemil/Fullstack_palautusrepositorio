import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  // const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }, [])

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }
  
  // useEffect(hook, [])
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      // .then(response => {
      //   setNotes(response.data)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: notes.length + 1,
    }
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    // .then(response => {
    //   setNotes(notes.concat(response.data))
    //   setNewNote('')
    })
    // axios
    // .post('http://localhost:3001/notes', noteObject)
    // .then(response => {
    //   // console.log(response)
    //   setNotes(notes.concat(response.data))
    //   setNewNote('')
    // })
    // setNotes(notes.concat(noteObject))
    // setNewNote('')
  }

  const toggleImportanceOf = (id) => {
    // console.log(`importance of ${id} needs to be toggled`)
    // console.log('importance of ' + id + ' needs to be toggled')
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    // .then(response => {
    //   setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // alert(
      //   `the note '${note.content}' was already deleted from server`
      // )
      setNotes(notes.filter(n => n.id !== id))
    })
    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(note => note.id !== id ? note : response.data))
    // })
  }


  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>   
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        
        <button type="submit">save</button>
      </form>  
      <Footer />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App 
