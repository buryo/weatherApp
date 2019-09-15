import { appState } from "../state";
import axios from "axios";

const apiKey = "883f5d2b38852ab00175a1f529dbdf24";

export async function getApiData() {
  try {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${appState.city}&appid=${apiKey}`
      )
      .then(res => {
        appState.calculateTemprature(res.data.main.temp);
        appState.loading = true;
      })
      .catch(err => {
        appState.error =  err.response.data.message
        // this.setState({ error:});
      });
  } catch (err) {
    throw new Error("Something went wrong...");
  }
}