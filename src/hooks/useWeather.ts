import type { CityWeather, GeoLocation } from "@/types";
import axios from "axios";
import { useAppStore } from "@/store/useAppStore";
import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<CityWeather> => {
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

const fetchWeatherByCity = async (city: string): Promise<CityWeather> => {
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
  if (!geoData || geoData.length === 0) throw new Error("City not found");
  const { lat, lon } = geoData[0];
  return fetchWeatherByCoords(lat, lon);
};

export const useWeather = () => {
  const { city, coords } = useAppStore();
  const enabled = Boolean(city) || Boolean(coords);
  const queryKey = coords
    ? ["weather", "coords", coords.lat, coords.lon]
    : ["weather", "city", city];

  return useQuery({
    queryKey: queryKey, // caching key
    queryFn: async () => {
      if (coords) return fetchWeatherByCoords(coords.lat, coords.lon);
      if (city) return fetchWeatherByCity(city);
      throw new Error("No city or coords provided");
    },
    enabled: enabled, // only fetch when city is not empty
    retry: false, // don’t retry automatically if city not found
    staleTime: 1000 * 60 * 5, // every 5 min fetch again
  });
};
