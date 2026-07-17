import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 60 seconds — reduces unnecessary refetches
      staleTime: 1000 * 60,
      // Keep unused/inactive data in cache for 5 minutes
      gcTime: 1000 * 60 * 5,
      // Retry failed requests up to 2 times before surfacing an error
      retry: 2,
      // Retry with an exponential back-off (capped at 30 s)
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      // Refetch when the window regains focus so data stays fresh
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect by default (adjust per-query as needed)
      refetchOnReconnect: "always",
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
});
