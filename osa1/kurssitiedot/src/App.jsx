
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      {/* <h1>{course}</h1> */}
      <>
        <Header course = {course}/>
      </>
      {/* <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p> */}
      <>
        <Content part1 = {part1} part2 = {part2} part3 = {part3} ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
      </>
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
      <p>
        <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
      </p>
    </div>
  )
}

export default App

// Total
// tehtävien yhteismäärä
const Total = (props) => {
  let total = props.ex1 + props.ex2 + props.ex3
  return (
      <>
       Number of exercises {total}
      </>
  )
}

// Header
// kurssien nimet
const Header = (props) => {
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
      {/* <p>
        {part1} {ex1}
      </p>
      <p>
        {part2} {ex2}
      </p>
      <p>
        {part3} {ex3}
      </p> */}
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