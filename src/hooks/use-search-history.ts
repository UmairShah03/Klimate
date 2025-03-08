import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface SearchHistoryItems {
  id: string;
  search: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<SearchHistoryItems[]>(
    "search-history",
    []
  );

  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
  });

  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItems, "id" | "searchedAt">
    ) => {
      const newSearch: SearchHistoryItems = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };
      const filteredHistory = history.filter(
        (item: SearchHistoryItems) =>
          !(item.lat === search.lat && item.lon === search.lon)
      );

      const newHistory = [...filteredHistory, newSearch].slice(0, 10);

      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], () => newHistory);
    },
  });
  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], () => []);
    },
  });
  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory,
  };
}
