import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

interface GeoLocation {
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

interface FetchError extends Error {
  message: string;
}

const App = () => {
  const [weatherData, setWeatherData] = useState<GeoLocation[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
  const [cityToSearch, setCityToSearch] = useState<string>("");

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (!cityToSearch) return;

    const fetchGeoLocationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityToSearch}&limit=5&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Error occurred while fetching weather data");
        }

        const result: GeoLocation[] = await response.json();
        if (!result || result.length === 0) {
          throw new Error("City not found!");
        }

        setWeatherData(result);
        setError(null); // Let's say if you user inputs some invalid city, then it will throw the error. Now error is not anymore null, but let's say this time user enters the correct city name but he will not see the result because the error state still contains the previous error state's value. And hence the reason why we need to clear it this way →  setError(null)
      } catch (error) {
        const err = error as FetchError;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoLocationData();
  }, [cityToSearch, apiKey]);

  useEffect(() => {
    const fetchActualWeatherData = async () => {
      if (weatherData === null) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&appid=${apiKey}&units=metric`
        );

        const result: CityWeather = await response.json();
        setCityWeather(result);
        setError(null);
      } catch (error) {
        const err = error as FetchError;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActualWeatherData();
  }, [weatherData, apiKey]);

  return (
    <div className="h-screen w-screen bg-[#1f2937] flex items-center justify-center">
      <div className="w-[22rem] h-auto overflow-auto bg-[#111827] rounded-lg px-6 py-4 flex flex-col justify-start gap-4">
        <SearchBar
          setCityToSearch={setCityToSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <WeatherDisplay
          isLoading={isLoading}
          error={error}
          cityWeather={cityWeather}
        />
      </div>
    </div>
  );
};

export default App;
