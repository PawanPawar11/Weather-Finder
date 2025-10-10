export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface CityWeather {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export interface FetchError extends Error {
  message: string;
}

export interface ForecastApiItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ForecastApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastApiItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface DailyForecast {
  date: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}
