import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState([]) 
  const startVotes = Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)

  const drawAnecdote= () => {
    //console.log('draw anecdote pressed')
    const drawnNumber = drawMaker(anecdotes)
    setSelected(drawnNumber)
    console.log(drawnNumber)
  }

  const voteAnecdote = () => {
    if (votes.length === 0) {
      setVotes(startVotes)
    }
  
    setVotes(prevVotes => {
      const newVoteValue = prevVotes[selected] + 1
      const copy = [...prevVotes]
      copy[selected] = newVoteValue
      return copy
    })
  }
  
  return (
    <div>
      {anecdotes[selected]} has {votes[selected]} votes<br />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={drawAnecdote} text="next anecdote" />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const drawMaker = (props) => {
  const upperLimit = props.length
  // const upperLimit = 5
  const drawnNumber = Math.floor(Math.random() * upperLimit)
  return(drawnNumber)
}

export default App