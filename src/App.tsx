import * as React from 'react';
import './App.css';
import SidebarMenu from './components/SidebarMenu';
import WeatherApp from './components/WeatherApp';

class App extends React.Component{
  public state = { city: 'Amsterdam' }
  private apiKey = "883f5d2b38852ab00175a1f529dbdf24";

  public render() {
    return (
      <>
        <SidebarMenu test="" />
        <div className="App">
          <WeatherApp city={this.state.city} apiKey={this.apiKey} />
          <input type="text" onKeyPress={this.pressingEnter.bind(event)} />
        </div>
      </>
    );
  }

  private pressingEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const text = (event.target as HTMLInputElement).value;
      this.setState({ city: text });
      (event.target as HTMLInputElement).value = '';
    }
  }
}

export default App;