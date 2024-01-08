
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <>
        <Header course = {course}/>
      </>
      <>
        <Content part1 = {part1.name} part2 = {part2.name} part3 = {part3.name} ex1 = {part1.exercises} ex2 = {part2.exercises} ex3 = {part3.exercises}/>
      </>
      <>
        <Total ex1 = {part1.exercises} ex2 = {part2.exercises} ex3 = {part3.exercises}/>
      </>
    </div>
  )
}

export default App

// Total
// tehtävien yhteismäärä
const Total = (props) => {
  let total = props.ex1 + props.ex2 + props.ex3
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
  const part1 = props.part1
  const part2 = props.part2
  const part3 = props.part3
  const ex1 = props.ex1
  const ex2 = props.ex2
  const ex3 = props.ex3

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