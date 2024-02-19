import { useQuery } from "@tanstack/react-query";

import { geckoFetch } from "@/lib/coingecko";

// Cache / Update Frequency: every 60 seconds (every 30 seconds for Pro API)
async function getCurrentPrice(id: string[]) {
  const response = await geckoFetch(
    `/simple/price?ids=${id.toString()}&vs_currencies=brl`
  );
  const tokens = await response.json();

  return tokens;
}

export default function useGetCurrentPrice(id: string[]) {
  return useQuery({
    queryKey: ["currentPrice", id],
    queryFn: () => getCurrentPrice(id),
    staleTime: 60 * 1000,
    enabled: id.length > 0
  });
}
