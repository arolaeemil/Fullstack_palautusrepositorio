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
  const startVotes = Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(startVotes) 
   
  const [selected, setSelected] = useState(0)

  const drawAnecdote= () => {
    //console.log('draw anecdote pressed')
    const drawnNumber = drawMaker(anecdotes)
    setSelected(drawnNumber)
    //console.log(drawnNumber)
  }

  const voteAnecdote = () => {
    const newVoteValue = votes[selected] + 1
    const copy = [...votes]
    copy[selected] = newVoteValue
    setVotes(copy)
  }

  const mostVotes= () => {
    let mostVoted = votes[0]
    let mostVoted_i = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > mostVoted){
        mostVoted = votes[i]
        mostVoted_i = i 
      }
    }
    return mostVoted_i    
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} has {votes[selected]} votes<br />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={drawAnecdote} text="next anecdote" /><br />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes()]}
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
  const drawnNumber = Math.floor(Math.random() * upperLimit)
  return(drawnNumber)
}

export default App