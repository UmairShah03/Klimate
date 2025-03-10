import type { ForecastData, weatherCondition } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: weatherCondition;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyforecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyforecast).slice(0, 6);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  const renderedForecastDays = nextDays.map((day) => {
    return (
      <div
        key={day.date}
        className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4 min-w-[200px]"
      >
        <div>
          <p className="font-medium">
            {format(new Date(day.date * 1000), "EEE, MMM d")}
          </p>
          <p className="text-sm text-muted-foreground capitalize">
            {day.weather.description}
          </p>
        </div>

        {/* Temperature Section: High above, Low below on mobile */}
        <div className="flex flex-col items-center sm:flex-row justify-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center text-center">
            <span className="flex items-center text-red-500">
              <ArrowUp className="w-4 h-4 mr-1" />
              {formatTemp(day.temp_max)}
            </span>
            <span className="flex items-center text-blue-500">
              <ArrowDown className="w-4 h-4 mr-1" />
              {formatTemp(day.temp_min)}
            </span>
          </div>
        </div>

        {/* Wind & Humidity Section: Side by side on mobile too */}
        <div className="flex flex-row justify-center gap-4 sm:justify-end">
          <span className="flex flex-col items-center gap-1">
            <Wind className="h-4 w-4 text-blue-500" />
            {day.wind}%
          </span>
          <span className="flex flex-col items-center gap-1">
            <Droplets className="h-4 w-4 text-blue-500" />
            {day.humidity}%
          </span>
        </div>
      </div>
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>5 Days Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">{renderedForecastDays}</div>
      </CardContent>
    </Card>
  );
};
export default WeatherForecast;
