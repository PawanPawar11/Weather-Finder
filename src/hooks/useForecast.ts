import type {
  DailyForecast,
  ForecastApiItem,
  ForecastApiResponse,
  GeoLocation,
} from "@/types";
import axios from "axios";
import { useAppStore } from "@/store/useAppStore";
import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchForecastByCoords = async (
  lat: number,
  lon: number
): Promise<DailyForecast[]> => {
  const res = await axios.get<ForecastApiResponse>(
    `https://api.openweathermap.org/data/2.5/forecast`,
    {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric",
      },
    }
  );
  return convertToDaily(res.data.list);
};

const fetchForecastByCity = async (city: string): Promise<DailyForecast[]> => {
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
  return fetchForecastByCoords(lat, lon);
};

const convertToDaily = (list: ForecastApiItem[]): DailyForecast[] => {
  const groups = new Map<string, ForecastApiItem[]>();
  for (const item of list) {
    const date = item.dt_txt.split(" ")[0];
    let arr = groups.get(date);
    if (!arr) {
      arr = [];
      groups.set(date, arr);
    }
    arr.push(item);
  }

  const today = new Date().toISOString().slice(0, 10);
  // we want to fetch the data for next 5 days (exclude today)
  const dates = [...groups.keys()]
    .filter((d) => d > today)
    .sort()
    .slice(0, 5);

  const daily: DailyForecast[] = [];

  for (const date of dates) {
    const items = groups.get(date);
    if (!items || items.length === 0) continue;

    let midday = items.find((i) => i.dt_txt.endsWith("12:00:00"));
    if (!midday) {
      midday = items[Math.floor(items.length / 2)];
    }

    daily.push({
      date,
      temp: Math.round(midday.main.temp),
      temp_min: Math.round(midday.main.temp_min),
      temp_max: Math.round(midday.main.temp_max),
      description: midday.weather[0].description,
      icon: midday.weather[0].icon,
    });
  }

  return daily;
};

export const useForecast = () => {
  const { city, coords } = useAppStore();
  const enabled = Boolean(city) || Boolean(coords);
  const queryKey = coords
    ? ["forecast", "coords", coords.lat, coords.lon]
    : ["forecast", "city", city];

  return useQuery<DailyForecast[], Error>({
    queryKey: queryKey, // caching key
    queryFn: async () => {
      if (coords) return fetchForecastByCoords(coords.lat, coords.lon);
      if (city) return fetchForecastByCity(city);
      throw new Error("No city or coords provided");
    },
    enabled: enabled, // only fetch when city is not empty
    retry: false, // don’t retry automatically if city not found
    staleTime: 1000 * 60 * 5, // every 5 min fetch again
  });
};
