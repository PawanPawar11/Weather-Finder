import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityToSearch, setCityToSearch] = useState("");
  const [cityWeather, setCityWeather] = useState(null);

  useEffect(() => {
    if (!cityToSearch) return;

    const fetchGeoLocationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityToSearch}&limit=5&appid=57b0e17d17e7ac2c4512642f5bca0f88`
        );

        if (!response.ok) {
          throw new Error("Error occurred while fetching weather data");
        }

        const result = await response.json();
        if (!result || result.length === 0) {
          throw new Error("City not found!");
        }
        console.log("Resut is: ", result);
        setWeatherData(result);
      } catch (error) {
        setError(error.message);
        console.log("Error is: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoLocationData();
  }, [cityToSearch]);

  useEffect(() => {
    const fetchTempData = async () => {
      if (weatherData === null) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&appid=57b0e17d17e7ac2c4512642f5bca0f88&units=metric`
        );

        const result = await response.json();

        console.log("Resut is: ", result);
        setCityWeather(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTempData();
  }, [weatherData]);

  return (
    <div className="h-screen w-screen bg-[#1f2937] flex items-center justify-center">
      <div className="w-[22rem] h-auto overflow-auto bg-[#111827] rounded-lg px-6 py-4 flex flex-col justify-start gap-4">
        <h1 className="text-2xl  text-center font-bold text-[#22d3ee]">
          Weather Finder
        </h1>
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#374151] text-white border-none"
          type="text"
          placeholder="Enter your city name..."
        />
        <Button
          onClick={() => setCityToSearch(searchTerm)}
          className="bg-[#09a1c7] text-white text-sm font-bold outline-none border-none hover:bg-[#0890b2df] transition-all duration-500 hover:text-white cursor-pointer"
          type="submit"
          variant="outline"
        >
          Search
        </Button>

        {isLoading && (
          <p className="text-gray-300 text-center text-md font-semibold">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center">Error occurred: {error}</p>
        )}

        {cityWeather && !error && !isLoading && (
          <div className="text-white bg-[#1f2937] rounded-lg px-8 py-4">
            <p className="text-center text-3xl font-bold">
              {cityWeather.name}, {cityWeather.sys.country}
            </p>
            <div className="w-full flex items-center justify-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                className="size-16"
                alt=""
              />
              <p className="text-4xl font-bold">
                {Math.round(cityWeather.main.temp)}°C
              </p>
            </div>
            <p className="text-center text-[#22d3ee] font-medium capitalize">
              {cityWeather.weather[0].description}
            </p>
            <hr className="my-4 border-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-center font-semibold mb-1">
                  {Math.round(cityWeather.main.feels_like)}°C
                </p>
                <p className="text-xs text-gray-400 text-center">Feels like</p>
              </div>
              <div>
                <p className="text-center font-semibold mb-1">
                  {cityWeather.main.humidity}%
                </p>
                <p className="text-xs text-gray-400 text-center">Humidity</p>
              </div>
              <div>
                <p className="text-center font-semibold mb-1">
                  {cityWeather.wind.speed} m/s
                </p>
                <p className="text-xs text-gray-400 text-center">Wind</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
