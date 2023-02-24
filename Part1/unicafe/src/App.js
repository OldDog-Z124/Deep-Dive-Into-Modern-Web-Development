import { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, number, numberAfter='' }) => 
  <tr><td>{text}</td><td>{number}{numberAfter}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good*1 + neutral*0 + bad*-1) / total || 0
  const positive = good / total * 100 || 0

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' number={good} />
        <StatisticLine text='neutral' number={neutral} />
        <StatisticLine text='bad' number={bad} />
        <StatisticLine text='all' number={total} />
        <StatisticLine text='average' number={average} />
        <StatisticLine text='positive' number={positive} numberAfter=' %' />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App