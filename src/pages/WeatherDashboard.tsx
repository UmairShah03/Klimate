import CurrentWeather from "@/components/CurrentWeather";
import ErrorAlert from "@/components/ErrorAlert";
import FavouriteCities from "@/components/FavouriteCities";
import HourlyTemprature from "@/components/HourlyTemprature";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeoLocation } from "@/hooks/geo-location";
import {
  useForecastQuery,
  useReverseGeocodingQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { MapPin, RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    isLoading: locationLoading,
    error: locationError,
    getLocation,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodingQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <ErrorAlert
        title={"Location Error"}
        description={locationError}
        onClick={getLocation}
        btnTitle={"Error Loading"}
        Icon={<MapPin className="h-4 w-4" />}
      />
    );
  }
  if (!coordinates) {
    return (
      <ErrorAlert
        title="Location Rquired"
        description="Please Enable Your Location to see Your Weather"
        btnTitle="Error Loading"
        Icon={<MapPin className="h-4 w-4" />}
      />
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <ErrorAlert
        title="Error"
        description="Failed to Fetch Weather Data . PLease Try Again"
        onClick={handleRefresh}
        btnTitle="Retry"
        Icon={<RefreshCcw className="h-4 w-4" />}
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      <FavouriteCities />
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size={"icon"}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          onClick={handleRefresh}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4 ">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemprature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
