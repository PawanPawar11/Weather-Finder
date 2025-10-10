import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { useWeather } from "./hooks/useWeather";
import { useForecast } from "./hooks/useForecast";
import type { FetchError } from "./types";

const App = () => {
  const { data: cityWeather, isLoading, isError, error } = useWeather();
  const { data: forecasts } = useForecast();

  return (
    <div className="h-screen w-screen bg-[#1f2937] flex items-center justify-center">
      <div className="min-w-[30rem] h-auto overflow-auto bg-[#111827] rounded-lg px-6 py-4 flex flex-col justify-start gap-4">
        <SearchBar />
        <WeatherDisplay
          isLoading={isLoading}
          error={isError ? (error as FetchError).message : null}
          cityWeather={cityWeather ?? null}
          forecasts={forecasts ?? null}
        />
      </div>
    </div>
  );
};

export default App;
