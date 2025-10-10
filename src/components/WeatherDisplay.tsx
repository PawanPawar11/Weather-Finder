import type { CityWeather, DailyForecast } from "@/types";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import ForecastDay from "./ForecastDay";

interface Props {
  isLoading: boolean;
  error: string | null;
  cityWeather: CityWeather | null;
  forecasts?: DailyForecast[] | null;
}

const WeatherDisplay: React.FC<Props> = ({
  isLoading,
  error,
  cityWeather,
  forecasts,
}) => {
  return (
    <>
      {isLoading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {cityWeather && !error && !isLoading && (
        <div className="text-white bg-[#1f2937] rounded-lg px-8 py-4 mt-1">
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

      {forecasts && forecasts.length > 0 && (
        <div className="mt-1">
          <p className="text-sm text-gray-400 mb-3 text-center">
            5-Day Forecast
          </p>
          <div className="flex gap-3 overflow-x-auto px-1">
            {forecasts.map((f) => (
              <ForecastDay key={f.date} forecast={f} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherDisplay;
