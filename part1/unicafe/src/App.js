import { useState } from 'react'

const Button = ({ text, clickHandler }) => {
   return (
      <button onClick={clickHandler}>{text}</button>
   )
}

const StatisticsLine = ({ text, value }) => {
   return (
      <tr>
         <td>{text}</td>
         <td>{value}</td>
      </tr>
   )
}

const Statistics = ({ good, neutral, bad }) => {
   if (good === 0 && neutral === 0 && bad === 0)
      return (
         <p>No feedback given</p>
      )
   else
      return (
         <table>
            <tbody>
               <StatisticsLine text='good' value={good} />
               <StatisticsLine text='neutral' value={neutral} />
               <StatisticsLine text='bad' value={bad} />
               <StatisticsLine text='all' value={good + neutral + bad} />
               <StatisticsLine text='average' value={(good - bad) / (good + neutral + bad)} />
               <StatisticsLine text='positive' value={good / (good + neutral + bad) * 100 + ' %'} />
            </tbody>
         </table>
      )
}

const App = () => {
   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)

   const goodClickHandler = () => setGood(good + 1)
   const neutralClickHandler = () => setNeutral(neutral + 1)
   const badClickHandler = () => setBad(bad + 1)

   return (
      <>
         <h1>give feedback</h1>
         <Button text='good' clickHandler={goodClickHandler} />
         <Button text='neutral' clickHandler={neutralClickHandler} />
         <Button text='bad' clickHandler={badClickHandler} />

         <h1>statistics</h1>
         <Statistics good={good} neutral={neutral} bad={bad} />
      </>
   )
}

export default App
