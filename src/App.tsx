import * as React from 'react';
import './App.css';
import { appState } from "src/store/state";
import { observer } from "mobx-react";
import SidebarMenu from './components/SidebarMenu';
import Main from './components/WeatherApp';

@observer
class App extends React.Component{  
  public render() {
    return (
      <>
        <SidebarMenu />
        <div className="App">
          <Main />
          <input type="text" onKeyPress={this.inputHandler.bind(event)} />
        </div>
      </>
    );
  }

  // Check if enter was pressed
  private inputHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const city = (event.target as HTMLInputElement).value;
      appState.changeCity(city.charAt(0).toUpperCase() + city.slice(1)); // City to uppercase
      (event.target as HTMLInputElement).value = ''; // set it back to empty
    }
  }
}

export default App;