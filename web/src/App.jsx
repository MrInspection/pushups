import { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import Calendar from "./components/Calendar";
import Stats from "./components/Stats";

moment.locale("en");

function App() {
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US");

    const history = JSON.parse(localStorage.getItem("History")) || []; // get the history from local storage
    const lastEntry = history[0]; // get the last entry

    if (lastEntry && lastEntry.date !== today) {
      // if the date has changed, reset the PushUps item to 0
      localStorage.setItem("Pushups", JSON.stringify(0));
    }
  }, []);

  const [count, setCount] = useState(
    Number.parseInt(localStorage.getItem("Pushups")) || 0
  );
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("History")) || [
      {
        count,
        date: new Date().toLocaleDateString("en-US"),
      },
    ]
  );

  const incrementPushups = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleInputChange = (event) => {
    setCount(Number(event.target.value));
  };

  const addToHistory = () => {
    const newEntry = { count, date: new Date().toLocaleDateString("en-US") };
    const lastLog = history[0];
    const today = new Date().toLocaleDateString("en-US");
    let newHistory = [];

    if (today === lastLog.date) {
      newHistory = [newEntry, ...history.slice(1, history.length)];
    } else {
      newHistory = [newEntry, ...history];
    }
    setHistory(newHistory);
    localStorage.setItem("Pushups", count);
    localStorage.setItem("History", JSON.stringify(newHistory));
  };

  const formatDate = (inputDate) => {
    const today = moment().startOf("day");
    const inputDateStartOfDay = moment(inputDate, "M-D-YYYY").startOf("day");
    const daysAgo = today.diff(inputDateStartOfDay, "days");

    if (daysAgo === 0) {
      return "Today";
    } else if (daysAgo === 1) {
      return "Yesterday";
    } else {
      return `${daysAgo} days ago`;
    }
  };

  const today = new Date().toLocaleDateString("en-US");

  return (
    <>
      <header>
        <Stats history={history} />
      </header>
      <h1>{count} push ups today!</h1>
      <div className="card">
        <input
          className="pushupInput"
          type="number"
          value={count}
          min="0"
          onChange={handleInputChange}
        />
        <button className="increasePushupButton" onClick={incrementPushups}>
          Add push-up
        </button>
      </div>
      <div>
        <button onClick={addToHistory}>Save</button>
      </div>
      <div className="history">
        <h2>History</h2>
        <Calendar history={history} today={today} />
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Push-ups</th>
            </tr>
          </thead>
          <tbody>
            {history.slice(0, 10).map((entry, index) => (
              <tr key={index}>
                <td>{formatDate(entry.date)}</td>
                <td>{entry.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
