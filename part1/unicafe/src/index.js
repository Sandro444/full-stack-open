import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad, averageScore }) => {
    return (
        <>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={good+bad+neutral} />
            <Statistic text="average" value={averageScore()} />
            <Statistic text="positive" value={(good / (good + bad + neutral)) * 100} p={true} />
        </>
    );
};

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}> {text} </button>
  )
}

const Statistic = ({text, value, p}) => {
  return <p> {text} - {value} {p? "%":""} </p>
}

const App = () => {
    // save clicks of each button to own state
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

    const averageScore = () => {
        return (0 - bad + good) / (good + bad + neutral);
    };

    const renderStatistics = () => {
      if(good + bad + neutral <= 0){
        return <p>No feedback given</p>
      }
      return <Statistics good={good} bad={bad} neutral={neutral} averageScore={averageScore} />
    }
    return (
        <div>
            <h1>Give feedback</h1>
            <Button text="good" clickHandler={handleGood} />
            <Button text="neutral" clickHandler={handleNeutral} />
            <Button text="bad" clickHandler={handleBad} />

            <h1>Statistics</h1>
            {
              renderStatistics()
            }
            
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
