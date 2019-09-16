import { IWeatherApiData } from './weather/types';
import { action, observable } from "mobx";
import { getApiData } from './weather/utilities';

export interface AppState {
    state: State;
}

export interface ISelectedUnitData {
    unitType: string;
}

export const enum TempratureUnits {
    KALVIN, CALCIUS, FAHRENHEIT
}

class State {
    @observable
    public selectedUnit = TempratureUnits.CALCIUS;

    @observable
    public tempratureUnit = '°C';

    @observable
    public tempratureBase: number;

    @observable
    public temprature : number = 0;

    @observable
    public weatherData: IWeatherApiData;

    @observable
    public loading : boolean = true;

    @observable
    public error : string = '';

    @observable
    public city : string = 'Amsterdam';

    @action
    public changeTempratureUnit(selectedUnitData: ISelectedUnitData) {
        switch (selectedUnitData.unitType) {
            case 'calcius':
                this.selectedUnit = TempratureUnits.CALCIUS;
                this.tempratureUnit = '°C';
                break;
            case 'fahrenheit':
                this.selectedUnit = TempratureUnits.FAHRENHEIT;
                this.tempratureUnit = '°F';
                break;
            case 'kalvin':
                this.selectedUnit = TempratureUnits.KALVIN;
                this.tempratureUnit = 'K';
            default:
                break;
        }
        this.calculateTemprature();
    }

    @action
    public calculateTemprature(baseTemp: number = this.tempratureBase) {
        this.tempratureBase = baseTemp;
        switch (this.selectedUnit) {
            case TempratureUnits.CALCIUS:
                this.temprature = Math.round(this.tempratureBase - 273.15);
                break;
            case TempratureUnits.FAHRENHEIT:
                this.temprature = Math.round((this.tempratureBase - 273.15) * 9 / 5 + 32);
                break;
            case TempratureUnits.KALVIN:
                this.temprature = baseTemp;
                break;
            default:
                break;
        }
        this.error = '';
        appState.loading = false;
    }

    @action
    public changeCity(city: string) {
        this.city = city;
        getApiData();
    }
}

export const appState = new State;