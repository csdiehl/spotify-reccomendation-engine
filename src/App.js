import { Switch } from "react-router-dom";
import "./App.css";
import GetAuth from "./components/GetAuth";
import { Route } from "react-router-dom";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <GetAuth />
        </Route>
        <Route path = '/redirect'>
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
