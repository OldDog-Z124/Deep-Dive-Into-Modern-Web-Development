import { useState } from 'react'

const Anecdote = ({text, votes}) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [anecdoteVotes, setAnecdoteVotes] = useState(new Array(anecdotes.length).fill(0))

  const indexWithmostVotes = anecdoteVotes.indexOf(Math.max(...anecdoteVotes))

  const getNextSelected = () => {
    const next = getRandomInt(anecdotes.length)
    if (next === selected) getNextSelected()
    return next
  }

  const handleVoteClick = () => {
    const updatedAnecdoteVotes = [...anecdoteVotes]
    updatedAnecdoteVotes[selected] += 1
    setAnecdoteVotes(updatedAnecdoteVotes)
  }
  const handleNextAnecdoteClick = () => setSelected(getNextSelected())

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={anecdoteVotes[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextAnecdoteClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[indexWithmostVotes]} votes={anecdoteVotes[indexWithmostVotes]} />
    </div>
  )
}

export default App