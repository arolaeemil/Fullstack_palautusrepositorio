import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  //console.log('rendering with  value', good)
  const [neutral, setNeutral] = useState(0)
  //console.log('rendering with  value', neutral)
  const [bad, setBad] = useState(0)
  //console.log('rendering with  value', bad)


  const increaseGood = () => {
    //console.log('good increasing, value before', good)
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    //console.log('neutral increasing, value before', neutral)
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    //console.log('bad increasing, value before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ good, neutral, bad }) =>
<div>
<h1>statistics</h1>
<Statistics good={good} neutral={neutral} bad={bad}/>
</div>

const Statistics = ({ good, neutral, bad }) =>{

  const total = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*-1)/total

  if (total === 0){
    return(
    <p>No feedback given</p>
    )
  }
  return(
  <p>
    {/* good {good}<br/> */}
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="all" value ={total} />
    <StatisticLine text="average" value ={average} />
    <StatisticLine text="positive" value ={good/total} />
  </p>)
  }

const StatisticLine = (props) =>{
  if (props.text === "positive")
    return(
      <>{props.text} {props.value} %<br/></>)      
  return(
    <>{props.text} {props.value}<br/></>)
  }

export default App