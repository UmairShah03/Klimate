export interface Coordinates {
  lat: number;
  lon: number;
}

export interface weatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  coord: Coordinates;
  weather: weatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  name: string;
}

export interface ForecastData {
  list: {
    dt: number;
    main: WeatherData["main"];
    weather: weatherCondition[];
    wind: WeatherData["wind"];
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface GeoCodingData {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
