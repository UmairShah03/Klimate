import type { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface weatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: weatherDetailsProps) => {
  const { wind, sys, main } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:m a");
  };

  const getWindDirection = (degree: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    degree = ((degree % 360) + 360) % 360;

    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure}hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  const renderedDetails = details.map((detail) => {
    return (
      <div
        key={detail.title}
        className="flex  items-center gap-3 rounded-lg border p-4"
      >
        <detail.icon className={`h-4 w-4 ${detail.color}`} />
        <div>
          <p className="text-sm font-medium leading-none">{detail.title}</p>
          <p className="text-sm text-muted-foreground">{detail.value}</p>
        </div>
      </div>
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">{renderedDetails}</div>
      </CardContent>
    </Card>
  );
};
export default WeatherDetails;
