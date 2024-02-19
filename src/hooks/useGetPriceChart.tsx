import { useQuery } from "@tanstack/react-query";

import { geckoFetch } from "@/lib/coingecko";

// 1 day = 30 seconds cache
// 2-90 days = 30 minutes cache
// 90 days = 12 hours cache

export type PriceChart = {
  x: number;
  y: number;
}[];

async function getPriceChart(id: string, days: number): Promise<PriceChart> {
  const response = await geckoFetch(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}${
      days > 7 ? "&interval=daily" : ""
    }`
  );
  const tokens = await response.json();

  const priceChart: PriceChart = tokens.prices.map((item: any[]) => ({
    x: item[0],
    y: item[1]
  }));

  return priceChart;
}

type UseGetPriceChartProps = {
  id: string;
  days?: number;
};

export default function useGetPriceChart({
  id,
  days = 30
}: UseGetPriceChartProps) {
  return useQuery({
    queryKey: ["priceChart", id, days],
    queryFn: () => getPriceChart(id, days),
    staleTime: 60 * 5000,
    enabled: id.length > 0
  });
}
