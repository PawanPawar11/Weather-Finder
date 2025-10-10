import React from "react";
import type { DailyForecast } from "../types";

const ForecastDay: React.FC<{ forecast: DailyForecast }> = ({ forecast }) => {
  const date = new Date(forecast.date);
  const label = date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center gap-1 px-3 py-2 bg-[#0b1220] rounded-md w-full">
      <div className="text-xs text-gray-300">{label}</div>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
        className="size-12"
      />
      <div className="text-sm font-semibold text-white">{forecast.temp}°C</div>
      <div className="text-xs text-gray-400 text-center capitalize">
        {forecast.description}
      </div>
    </div>
  );
};

export default ForecastDay;
