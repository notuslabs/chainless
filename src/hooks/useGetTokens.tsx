import { useQuery } from "@tanstack/react-query";

import { tokensList } from "@/constants/tokens";
import { geckoFetch } from "@/lib/coingecko";

export type GetTokens = {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number | null;
  max_supply: number | null;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
};

// Cache / Update Frequency: every 45 seconds
async function getTokens(): Promise<GetTokens[]> {
  const response = await geckoFetch(
    `/coins/markets?vs_currency=usd&ids=${tokensList.toString()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );
  const tokens = await response.json();

  return tokens;
}

export default function useGetTokens() {
  return useQuery({
    queryKey: ["tokensPrice"],
    queryFn: getTokens,
    staleTime: 60 * 1000
  });
}
