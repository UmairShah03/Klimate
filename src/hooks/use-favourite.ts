import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavouriteCity {
  id: string;
  search?: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavourite() {
  const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>(
    "favourites",
    []
  );

  const queryClient = useQueryClient();

  const favouriteQuery = useQuery({
    queryKey: ["favourites"],
    queryFn: () => favourites,
    initialData: favourites,
    staleTime: Infinity,
  });

  const addToFavourite = useMutation({
    mutationFn: async (city: Omit<FavouriteCity, "id" | "addedAt">) => {
      const newFavourite: FavouriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      if (favourites.some((fav) => fav.id === newFavourite.id)) {
        return favourites;
      }

      const newFavourites = [...favourites, newFavourite].slice(0, 10);
      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["favourites"], newData);
    },
  });

  const removeFavourite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavourites = favourites.filter((city) => city.id !== cityId);
      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["favourites"], newData);
    },
  });

  return {
    favourites: favouriteQuery.data || [],
    addToFavourite,
    removeFavourite,
    isFavourite: (lat: number, lon: number) => {
      return (
        favouriteQuery.data?.some(
          (fav) => fav.lat === lat && fav.lon === lon
        ) || false
      );
    },
  };
}
