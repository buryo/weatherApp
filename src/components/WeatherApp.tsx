import axios from 'axios';
import { observer } from "mobx-react"
import * as React from 'react';
import { IWeatherApiData } from '../interfaces/WeatherApi';
import { IWeatherAppProps } from '../interfaces/WeatherProps';
import { appState } from '../store/tempratureUnit';

@observer
export default class Weather extends React.Component<IWeatherAppProps, { weatherData: IWeatherApiData, loading: boolean, error: string }> {
    constructor(props: IWeatherAppProps) {
        super(props);
        this.state = { weatherData: { name: '', main: { temp: 0 } }, loading: false, error: '' }
    }

    public componentDidMount(): void {
        this.getApiData();
    }

    public componentDidUpdate(prevProps: any): void {
        if (this.props !== prevProps) {
            this.getApiData();
        }
    }

    public async getApiData(city?: string, zip?: string): Promise<void> {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=${this.props.apiKey}`)
            .then(res => {
                appState.calculateTemprature(res.data.main.temp);
                this.setState({ weatherData: res.data, loading: true, error: '' });
            })
            .catch(err => {
                this.setState({error: err.response.data.message});
            })
    }

    public render() {
        const { weatherData, loading, error } = this.state;
        return (
            <>
                {loading ? (
                    <div className="container">
                        <h1>{weatherData.name}</h1>
                        <h2>{appState.temprature} {appState.tempratureUnit}</h2>
                        { error ? error : ''}
                    </div>
                ) : (
                        null
                    )}
            </>
        );
    }
}
