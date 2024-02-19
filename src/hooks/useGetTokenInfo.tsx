import { useQuery } from "@tanstack/react-query";

import { geckoFetch } from "@/lib/coingecko";

//Cache / Update Frequency: every 60 seconds
async function getTokenInfo(id: string) {
  const response = await geckoFetch(
    `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
  );
  const tokens = await response.json();

  return tokens;
}

export default function useGetTokenInfo(id: string) {
  return useQuery({
    queryKey: ["tokenInfo", id],
    queryFn: () => getTokenInfo(id),
    staleTime: 60 * 1000,
    enabled: id.length > 0
  });
}
