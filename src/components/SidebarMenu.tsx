import { observer } from "mobx-react";
import * as React from "react";
import { appState } from "../store/state";

@observer
export default class SideBar extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="side-bar">
        <select
          name="unit"
          id="unit"
          defaultValue={appState.tempratureUnit}
          onChange={this.handleUnitChange}
        >
          <option value="calcius">Calcius | °C</option>
          <option value="fahrenheit">Fahrenheit | °F</option>
          <option value="kalvin">Kalvin | K</option>
        </select>
      </div>
    );
  }

  private handleUnitChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    const value = (event.target as HTMLInputElement).value;
    appState.changeTempratureUnit({ unitType: value });
  };
}
