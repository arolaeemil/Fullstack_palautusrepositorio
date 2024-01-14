import React from 'react';

const App = () => {
  const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
    </div>
  )
}

export default App

// Course
// Koko kurssi
const Course = (props) => {
  const courses = props.course
  console.log(props)
  return (
      <>
      {/* <Header course = {course}/>
      <Content course = {course}/>
      <strong><Total course = {course}/></strong> */}
      {/* <Header key={course.id} {...course}/> */}
      {courses.map(course => (
      <React.Fragment key={course.id}>
        <Header {...course}/>
        <Content {...course}/>
        <Total {...course}/>
      </React.Fragment>
      ))}
      </>
  )
}

// Total
// tehtävien yhteismäärä
const Total = (props) => {
  // let total = 0
  // for (let index = 0; index < props.course.parts.length; index++) {
  //   const element = props.course.parts[index].exercises;
  //   total = total + element
  // }
  // const parts = props.course.parts
  const parts = props.parts
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  // console.log(total)
  return (
      <p>
       <strong>Number of exercises {total}</strong>
      </p>
  )
}

// Header
// kurssien nimet
const Header = (props) => {
  //console.log(props)
  // const course = props.course.name
  const course = props.name
  return (
      <>
        <h2>{course}</h2>
      </>
  )
}

// Content
// kurssien osat ja osien tehtävämäärät
const Content = (props) => {
  const newlist = []

  // for (let index = 0; index < props.course.parts.length; index++) {
  //   const partname = props.course.parts[index].name;
  //   const partexercises = props.course.parts[index].exercises;
  //   const id = props.course.parts[index].id;
  //   newlist.push({id: id, name: partname, exercises: partexercises})
  // }

  for (let index = 0; index < props.parts.length; index++) {
    const partname = props.parts[index].name;
    const partexercises = props.parts[index].exercises;
    const id = props.parts[index].id;
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