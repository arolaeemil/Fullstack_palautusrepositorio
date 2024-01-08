
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }


  return (
    <div>
      <>
        <Header course = {course}/>
      </>
      <>
        <Content course = {course}/>
      </>
      <>
        <Total course = {course}/>
      </>
    </div>
  )
}

export default App

// Total
// tehtävien yhteismäärä
const Total = (props) => {
  const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises;
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
  //console.log(props)
  const course = props.course.name
  return (
      <>
        <h1>{course}</h1>
      </>
  )
}

// Content
// kurssien osat ja osien tehtävämäärät
const Content = (props) => {
  const part1 = props.course.parts[0].name
  const ex1 = props.course.parts[0].exercises
  const part2 = props.course.parts[1].name
  const ex2 = props.course.parts[1].exercises
  const part3 = props.course.parts[2].name
  const ex3 = props.course.parts[2].exercises

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