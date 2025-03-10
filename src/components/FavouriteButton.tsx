import { WeatherData } from "@/api/types";
import { useFavourite } from "@/hooks/use-favourite";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface FavouriteButtonProps {
  data: WeatherData;
}

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
  const { isFavourite, addToFavourite, removeFavourite } = useFavourite();

  const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon);

  const handleToggleFavourite = () => {
    if (isCurrentlyFavourite) {
      removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favourites`);
    } else {
      addToFavourite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Add ${data.name} to favourites`);
    }
  };
  return (
    <Button
      variant={isCurrentlyFavourite ? "default" : "outline"}
      size={"icon"}
      className={
        isCurrentlyFavourite ? "bg-yellow-500 hover:bg-yellow-600" : ""
      }
      onClick={handleToggleFavourite}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavourite ? "fill-current" : ""}`}
      />
    </Button>
  );
};
export default FavouriteButton;
