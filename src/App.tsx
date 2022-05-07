import React from "react";

import { Home } from "./containers/Home";
import "./App.css";

export interface IApplicationProps {}

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
