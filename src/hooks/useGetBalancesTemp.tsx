import { Asset } from "@notuslabs/wallet";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "@/context/auth";

const tokens = [
  "AAVE",
  "BAL",
  "LINK",
  "COMP",
  "DAI",
  "FRAX",
  "MIMATIC",
  "SUSHI",
  "SNX",
  "USDT",
  "GRT",
  "UNI",
  "WBTC",
  "WETH",
  "WAVAX",
  "YFI",
  "STG",
  "WOO",
  "FXS"
];

export default function useGetBalancesTemp() {
  const { client } = useSession();

  async function getCurrenciesBalance() {
    if (!client) {
      return;
    }

    const balances = [];

    for (const token of tokens) {
      const res = client.account.getBalance({
        asset: token as unknown as Asset
      });

      balances.push(res);
    }

    const res = await Promise.all(balances);

    const arr = res.flatMap((item, i) => {
      const token = tokens[i];

      if (Number(item.balance) > 0) {
        return {
          balance: item.formattedBalance,
          crypto: token
        };
      }
      return [];
    });

    return {
      currencies: arr
    };
  }

  return useQuery({
    queryKey: ["balanceTemp"],
    queryFn: getCurrenciesBalance,
    staleTime: 30 * 1000
  });
}
