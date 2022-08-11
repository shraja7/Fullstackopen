import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const positive = good / total;

    if (total === 0) {
      return (
        <div>
          <h2>Statistics</h2>
          <p>No feedback given</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Statistics</h2>
        <ul>
          <li>good: {good}</li>
          <li>neutral: {neutral}</li>
          <li>bad: {bad}</li>
          <li>total: {total}</li>
          <li>average: {average}</li>
          <li>positive: {positive}%</li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
