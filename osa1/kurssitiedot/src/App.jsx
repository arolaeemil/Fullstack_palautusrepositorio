
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <>
        <Header course = {course}/>
      </>
      <>
        {/* <Content part1 = {part1.name} part2 = {part2.name} part3 = {part3.name} ex1 = {part1.exercises} ex2 = {part2.exercises} ex3 = {part3.exercises}/> */}
        <Content parts = {parts}/>
      </>
      <>
        {/* <Total ex1 = {part1.exercises} ex2 = {part2.exercises} ex3 = {part3.exercises}/> */}
        <Total parts = {parts}/>
      </>
    </div>
  )
}

export default App

// Total
// tehtävien yhteismäärä
const Total = (props) => {
  // let total = props.ex1 + props.ex2 + props.ex3
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;
  console.log(total)
  return (
      <p>
       Number of exercises {total}
      </p>
  )
}

// Header
// kurssien nimet
const Header = (props) => {
  console.log(props)
  const course = props.course
  return (
      <>
        <h1>{course}</h1>
      </>
  )
}

// Content
// kurssien osat ja osien tehtävämäärät
const Content = (props) => {
  const part1 = props.parts[0].name
  const ex1 = props.parts[0].exercises
  const part2 = props.parts[1].name
  const ex2 = props.parts[1].exercises
  const part3 = props.parts[2].name
  const ex3 = props.parts[2].exercises

  return (
      <>
      <Part part = {part1} ex = {ex1}/>
      <Part part = {part2} ex = {ex2}/>
      <Part part = {part3} ex = {ex3}/>
      </>
  )
}

const Part = (props) => {
  const part = props.part
  const ex = props.ex
  return(
    <p>
      {part} {ex}
    </p>
  )
}