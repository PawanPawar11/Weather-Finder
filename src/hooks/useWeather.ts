import type { CityWeather, GeoLocation } from "@/types";
import axios from "axios";
import { useAppStore } from "@/store/useAppStore";
import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchWeather = async (city: string): Promise<CityWeather> => {
  if (!city) throw new Error("Please enter a city name");

  const geoRes = await axios.get<GeoLocation[]>(
    `https://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        q: city,
        limit: 1,
        appid: apiKey,
      },
    }
  );

  const geoData = geoRes.data;

  if (!geoData.length) {
    throw new Error("City not found");
  }

  const { lat, lon } = geoData[0];

  const weatherRes = await axios.get<CityWeather>(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric",
      },
    }
  );

  return weatherRes.data;
};

export const useWeather = () => {
  const { city } = useAppStore();

  return useQuery({
    queryKey: ["weather", city], // caching key
    queryFn: () => fetchWeather(city),
    enabled: !!city, // only fetch when city is not empty
    retry: false, // don’t retry automatically if city not found
  });
};
