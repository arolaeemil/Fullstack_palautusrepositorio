import Note from './components/Note'

// const App = (props) => {
const App = ({ notes }) => {
  // const { notes } = props

  //siirrettiin moduuliin
  // const Note = ({ note }) => {
  //   return (
  //     <li>{note.content}</li>
  //   )
  // }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      {/* <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul> */}
      {/* Tämä on paras tapa näistä */}
      {/* <ul>
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul> */}
      {/* <ul>
        {notes.map((note, i) => 
          <li key={i}>
            {note.content}
          </li>
        )}
      </ul> */}
    </div>
  )
}

export default App
