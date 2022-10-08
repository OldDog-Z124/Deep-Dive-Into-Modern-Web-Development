import { useState } from 'react'

const Title = ({name}) => <h3>{name}</h3>

const Anecdote = ({text, votesCount}) => (
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>
)

const MostVotesAnecdote = ({anecdotes, votesList}) => {
  const mostVotesCount = Math.max(...votesList)
  const mostVotesIndex = votesList.indexOf(mostVotesCount)
  const anecdote = anecdotes[mostVotesIndex]
  const votes = votesList[mostVotesIndex]

  if (mostVotesCount === 0) return (
    <p>No votes yet</p>
  )

  return (
    <Anecdote 
      text={anecdote} 
      votesCount={votes}
    />
  )

}

const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [votesList, setVotesList] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const handleNextSelected = () => {
    const nextSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(nextSelected)
  }

  const handleVote = () => {
    const newVotesList = [...votesList]
    newVotesList[selected] += 1
    setVotesList(newVotesList)
  }

  return (
    <div>
      <Title name="Anecdote of the day" />
      <Anecdote 
        text={anecdotes[selected]} 
        votesCount={votesList[selected]}
      />
      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={handleNextSelected} />
      <Title name="Anecdote with most votes" />
      <MostVotesAnecdote
        anecdotes={anecdotes}
        votesList={votesList}
      />
    </div>
  )
}

export default App
