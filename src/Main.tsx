import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Weather from "./components/WeatherApp";
import PageNotFound from "./components/404";
import App from "./App";

class Main extends React.Component {
  public render() {
    return (
      <Router>
        <App>
          <Route path="/" exact={true} component={Weather} />
          <Route path="/404" component={PageNotFound} />
        </App>
      </Router>
    );
  }
}

export default Main;
