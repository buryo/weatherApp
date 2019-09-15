import { action, observable } from "mobx";

export interface IPropsWithState {
    state: WeatherAppState;
}

export interface ISelectedUnitData {
    unitType: string;
}

export const enum TempratureUnits {
    KALVIN, CALCIUS, FAHRENHEIT
}

class WeatherAppState {
    @observable
    public selectedUnit = TempratureUnits.CALCIUS;

    @observable
    public tempratureUnit = '°C';

    @observable
    public tempratureBase: number;

    @observable
    public temprature: number;

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
    }

    @action
    public calculateTemprature(baseTemp: number = this.tempratureBase) {
        this.tempratureBase = baseTemp;
        switch (this.selectedUnit) {
            case TempratureUnits.CALCIUS:
                this.temprature = Math.round(baseTemp - 273.15);
                break;
            case TempratureUnits.FAHRENHEIT:
                this.temprature = Math.round((baseTemp - 273.15) * 9 / 5 + 32);
                break;
            case TempratureUnits.KALVIN:
                this.temprature = baseTemp;
                break;
            default:
                break;
        }
    }
}




export const appState = new WeatherAppState();