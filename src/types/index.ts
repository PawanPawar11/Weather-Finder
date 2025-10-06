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
