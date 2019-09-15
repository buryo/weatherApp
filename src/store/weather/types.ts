export interface IWeatherApiData {
    name: string,
    main: { temp: number},
}

export interface IWeatherAppProps {
    city: string,
    apiKey: string,
    zip?: string,
}