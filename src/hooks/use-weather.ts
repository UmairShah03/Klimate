import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/WeatherApi";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["seatch-location", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherAPI.getCurrentWeather(coordinates)
        : Promise.resolve(null),
    enabled: !!coordinates,
  });
}
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getForecast(coordinates) : Promise.resolve(null),
    enabled: !!coordinates,
  });
}

export function useReverseGeocodingQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherAPI.getReverseGeoCode(coordinates)
        : Promise.resolve(null),
    enabled: !!coordinates,
  });
}

export function useSearchLocationQuery(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLoations(query),
    enabled: query.length >= 3,
  });
}
