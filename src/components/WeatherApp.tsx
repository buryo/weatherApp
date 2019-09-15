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
    console.log("comp did mount");
    getApiData();
  }

  public componentDidUpdate(prevProps: any): void {
    if (this.props !== prevProps) {
      console.log("comp did update");
      getApiData();
    }
  }

  public render() {
    const { temprature, loading, error, tempratureUnit, city } = appState;
    return (
      <>
        {loading ? (
          <div className="container">
            <h1>{city}</h1>
            <h2>
              {temprature} {tempratureUnit}
            </h2>
            {error ? error : ""}
          </div>
        ) : null}
      </>
    );
  }
}
