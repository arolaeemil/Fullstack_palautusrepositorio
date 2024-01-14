
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test of a component',
        exercises: 99,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

// Course
// Koko kurssi
const Course = (props) => {
  const course = props.course
  console.log(props)
  return (
      <>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>
      </>
  )
}

// Total
// tehtävien yhteismäärä
const Total = (props) => {
  // const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  let total = 0
  for (let index = 0; index < props.course.parts.length; index++) {
    const element = props.course.parts[index].exercises;
    total = total + element
  }
  // console.log(total)
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
  // const part1 = props.course.parts[0].name
  // const ex1 = props.course.parts[0].exercises
  // const part2 = props.course.parts[1].name
  // const ex2 = props.course.parts[1].exercises
  // const part3 = props.course.parts[2].name
  // const ex3 = props.course.parts[2].exercises
  // const namelist = []
  // const exerciselist = []
  const newlist = []

  for (let index = 0; index < props.course.parts.length; index++) {
    const partname = props.course.parts[index].name;
    const partexercises = props.course.parts[index].exercises;
    const id = props.course.parts[index].id;
    // namelist.push(partname)
    // exerciselist.push(partexercises)
    newlist.push({id: id, name: partname, exercises: partexercises})
  }  

  return (
      <>
      {/* <Part part = {part1} ex = {ex1}/>
      <Part part = {part2} ex = {ex2}/>
      <Part part = {part3} ex = {ex3}/> */}
      {newlist.map(part => <Part key={part.id} part = {part.name} ex = {part.exercises} />)}
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