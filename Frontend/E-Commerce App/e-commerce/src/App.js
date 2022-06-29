import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Description from "./components/Description";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/AddItem">
            <AddItem />
          </Route>
          <Route exact path="/details/:id">
            <Description />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
