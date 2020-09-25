import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return(
  <p>{props.part} {props.exercises}</p>
  )
}

const Header = (props) => {
  return(
  <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const content = props.courses.map(course => {
    return(
      <>
      <Part part={course[0]} exercises={course[1]} />
      </>
    )
  })
  return(
    <>
      {content}
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total}</p>
  )
}

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
      <Header course={course} />
      <Content courses={[[part1,exercises1],[part2,exercises2],[part3,exercises3]]} />
      <Total total = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))