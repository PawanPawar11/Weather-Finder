import type { CityWeather, GeoLocation } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchWeather = async (city: string): Promise<CityWeather> => {
  if (!city) throw new Error("Please enter a city name");

  const geoRes = await axios.get<GeoLocation[]>(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );

  const geoData: GeoLocation[] = geoRes.data;

  if (!geoData.length) {
    throw new Error("City not found");
  }

  const { lat, lon } = geoData[0];

  const weatherRes = await axios.get<CityWeather>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  const weatherData: CityWeather = weatherRes.data;

  return weatherData;
};

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => {
      return fetchWeather(city);
    },
    enabled: !!city,
    retry: false,
  });
};
