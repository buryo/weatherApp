import { observer } from "mobx-react";
import * as React from "react";
import { appState } from "../store/state";
import { Link } from "react-router-dom";

@observer
export default class SideBar extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="sidebar">
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
        <ul className="sidebar-links">
          {this.CreateButton("Home")}
        </ul>
      </div>
    );
  }

  public CreateButton = (text: string) => {
    return (
      <div className="dropdown-button">
        <li className="onHover">
          <div className="dropdown">
            <Link to="/">{text}</Link>
          </div>
        </li>
      </div>
    );
  };

  public handleUnitChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    const value = (event.target as HTMLInputElement).value;
    appState.changeTempratureUnit({ unitType: value });
  };
}
