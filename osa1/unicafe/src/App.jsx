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
    <p>
    good {good}<br/>
    neutral {neutral}<br/>
    bad {bad}
    </p>
</div>

export default App