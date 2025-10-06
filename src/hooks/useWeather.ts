import type { CityWeather, FetchError, GeoLocation } from "@/types";
import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchWeather = async (city: string): Promise<CityWeather> => {
  if (!city) throw new Error("Please enter a city name");

  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );

  if (!geoRes.ok) {
    throw new Error("Error while fetching geo co-ordinates of specified city");
  }

  const geoData: GeoLocation[] = await geoRes.json();

  if (!geoData.length) {
    throw new Error("City not found");
  }

  const { lat, lon } = geoData[0];

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  if (!weatherRes.ok) {
    throw new Error("Error while fetching weather data of specified city");
  }

  const weatherData: CityWeather = await weatherRes.json();

  return weatherData;
};

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => {
      fetchWeather(city);
    },
    enabled: !!city,
    retry: false,
  });
};
