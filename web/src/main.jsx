import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Fix Problems with Locale
if (navigator.language !== "en-US") {
  // Get the array from local storage
  let array = JSON.parse(localStorage.getItem("History")); // replace 'yourArrayKey' with the actual key

  // Iterate over the array
  array.forEach((item) => {
    // Parse the date string
    let date = new Date(item.date);

    // Format the date in 'M/D/YYYY' format
    let formattedDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    // Update the date in the object
    item.date = formattedDate;
  });

  // Save the updated array back to local storage
  localStorage.setItem("History", JSON.stringify(array));
}
