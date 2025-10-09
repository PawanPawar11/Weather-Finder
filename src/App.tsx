import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { useWeather } from "./hooks/useWeather";
import type { FetchError } from "./types";

const App = () => {
  const { data, isLoading, isError, error } = useWeather();

  return (
    <div className="h-screen w-screen bg-[#1f2937] flex items-center justify-center">
      <div className="w-[22rem] h-auto overflow-auto bg-[#111827] rounded-lg px-6 py-4 flex flex-col justify-start gap-4">
        <SearchBar />
        <WeatherDisplay
          isLoading={isLoading}
          error={isError ? (error as FetchError).message : null}
          cityWeather={data ?? null}
        />
      </div>
    </div>
  );
};

export default App;
