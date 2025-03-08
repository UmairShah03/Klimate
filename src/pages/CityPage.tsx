import CurrentWeather from "@/components/CurrentWeather";
import ErrorAlert from "@/components/ErrorAlert";
import FavouriteButton from "@/components/FavouriteButton";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const { cityName } = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <ErrorAlert
        title="Error"
        description="Failed to Fetch Weather Data . PLease Try Again"
        btnTitle="Retry"
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !cityName) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl tracking-tight">
          {cityName} , {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavouriteButton data={{ ...weatherQuery.data, name: cityName }} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col  ">
          <CurrentWeather data={weatherQuery.data} />
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

export default CityPage;
