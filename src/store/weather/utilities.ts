import { appState } from "../state";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export async function getApiData() {
  try {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${appState.city}&appid=${apiKey}`
      )
      .then(res => {
        appState.calculateTemprature(res.data.main.temp);
      })
      .catch(err => {
        appState.error =  err.response.data.message;
        appState.loading = false;
      });
  } catch (err) {
    throw new Error("Something went wrong...");
  }
}