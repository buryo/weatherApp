import { observer } from "mobx-react";
import * as React from "react";
import { IWeatherAppProps } from "../store/weather/types";
import { appState } from "src/store/state";
import { getApiData } from "src/store/weather/utilities";

@observer
export default class Weather extends React.Component {
  public constructor(props: IWeatherAppProps) {
    super(props);
    this.state = {
      weatherData: { name: "", main: { temp: 0 } },
    };
  }

  public componentDidMount(): void {
    getApiData();
  }

  public componentDidUpdate(prevProps: any): void {
    if (this.props !== prevProps) {
      getApiData();
    }
  }

  public render() {
    const { temprature, loading, error, tempratureUnit, city } = appState;
    return (
      <>
        <input type="text" onKeyPress={this.inputHandler.bind(event)} />
        {!loading ? (
          <div className="container">
            {!error ? (
              <>
                <h1>{city}</h1>
                <h2>
                  {temprature} {tempratureUnit}
                </h2>
              </>
            ) : (
              error
            )}
          </div>
        ) : null}
      </>
    );
  }

  // Check if enter was pressed
  private inputHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      const city = (event.target as HTMLInputElement).value;
      appState.changeCity(city.charAt(0).toUpperCase() + city.slice(1)); // City to uppercase
      (event.target as HTMLInputElement).value = ""; // set it back to empty
    }
  };
}
