import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([
    { count, date: new Date().toLocaleDateString() },
  ]);

  const incrementPushups = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleInputChange = (event) => {
    setCount(Number(event.target.value));
  };

  const addToHistory = () => {
    const newEntry = { count, date: new Date().toLocaleDateString() };
    const lastLog = history[history.length - 1];
    const today = new Date().toLocaleDateString();
    if (today === lastLog.date) {
      setHistory([...history.slice(0, history.length - 1), newEntry]);
    } else {
      setHistory([...history, newEntry]);
    }
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
      <div>
        <h2>History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Push-ups</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
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
