import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
