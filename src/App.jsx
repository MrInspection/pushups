import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(localStorage.getItem("Pushups") || 0);
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

  const formatDate = (date) => {
    return date;
  };

  return (
    <>
      <h1>{count} push ups today!</h1>
      <div className="card">
        <input type="number" value={count} onChange={handleInputChange} />
        <button onClick={incrementPushups}>Add push-up</button>
      </div>
      <div>
        <button onClick={addToHistory}>Save</button>
      </div>
      <div className="history">
        <h2>History</h2>
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
