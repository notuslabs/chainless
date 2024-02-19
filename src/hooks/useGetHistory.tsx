import { useQuery } from "@tanstack/react-query";

import { useSession } from "@/context/auth";

export default function useGetHistory() {
  const { client } = useSession();

  async function getHistory() {
    if (!client) {
      return;
    }

    const res = await client.account.getTransactions();
    return res;
  }

  return useQuery({
    queryKey: ["transactionsHistory"],
    queryFn: getHistory,
    staleTime: 60 * 1000
  });
}
