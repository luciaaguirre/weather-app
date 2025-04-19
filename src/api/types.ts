export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        temp_min:number;
        temp_max: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number
    };
    sys: {
        sunrise: number;
        sunset: number;
        country: string;
    };
    name: string;
    dt: number;
}