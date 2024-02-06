import { useState } from "react";
import moment from "moment";
import "./App.css";
import Calendar from "react-github-contribution-calendar";

var panelColors = ["#EEEEEE", "#F78A23", "#F87D09", "#AC5808", "#7B3F06"];

function App() {
  const [count, setCount] = useState(
    Number.parseInt(localStorage.getItem("Pushups")) || 0
  );
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("History")) || [
      {
        count,
        date: new Date().toLocaleDateString(),
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
    const newEntry = { count, date: new Date().toLocaleDateString() };
    const lastLog = history[0];
    const today = new Date().toLocaleDateString();
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

  const values = history.reduce((prev, now) => {
    return {
      ...prev,
      [moment(now.date, "MM:DD:YYYY").format("YYYY-MM-DD")]: now.count,
    };
  }, {});
  console.log(values);
  const until = new Date().toLocaleDateString();

  return (
    <>
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
        <Calendar values={values} until={until} panelColors={panelColors} />
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
