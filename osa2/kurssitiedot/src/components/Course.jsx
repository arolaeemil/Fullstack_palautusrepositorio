import React from 'react';

const Course = (props) => {
    const courses = props.course
    console.log(props)
    return (
        <>
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
  
  const Total = (props) => {
    const parts = props.parts
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
         <strong>Number of exercises {total}</strong>
        </p>
    )
  }
  
  const Header = (props) => {
    const course = props.name
    return (
        <>
          <h2>{course}</h2>
        </>
    )
  }
  
  const Content = (props) => {
    const newlist = []
  
    for (let index = 0; index < props.parts.length; index++) {
      const partname = props.parts[index].name;
      const partexercises = props.parts[index].exercises;
      const id = props.parts[index].id;
      newlist.push({id: id, name: partname, exercises: partexercises})
    }  
  
    return (
        <>
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

  export default Course