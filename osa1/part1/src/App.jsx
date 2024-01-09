const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const App = (props) => {
    const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App

// a + c osan alun app.
// const App = (props) => {
//   const nimi = 'Pekka'
//   const ika = 10

//   return (
//     <>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={nimi} age={ika} />
//     </>
//   )
// }