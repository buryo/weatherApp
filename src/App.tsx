import * as React from "react";
import "./App.css";
import { observer } from "mobx-react";
import SidebarMenu from "./components/SidebarMenu";

@observer
class App extends React.Component {
  public render() {
    return (
      <>
        <SidebarMenu />
        <div className="App">{this.props.children}</div>
      </>
    );
  }
}

export default App;
