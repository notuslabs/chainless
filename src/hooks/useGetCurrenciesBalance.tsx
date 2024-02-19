import { Asset, StableCurrency } from "@notuslabs/wallet";
import { useQuery } from "@tanstack/react-query";

import { useSession } from "@/context/auth";

const tokens = [
  {
    currency: StableCurrency.BRZ,
    image:
      "https://assets.coingecko.com/coins/images/8472/standard/MicrosoftTeams-image_%286%29.png?1696508657",
    coingeckoId: "brz"
  },
  {
    currency: StableCurrency.USDC,
    image:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    coingeckoId: "usd-coin"
  }
];

export default function useGetCurrenciesBalance() {
  const { client } = useSession();

  async function getCurrenciesBalance() {
    if (!client) {
      return;
    }

    const balances = [];

    for (const token of tokens) {
      const res = client.account.getBalance({
        asset: token.currency as unknown as Asset
      });

      balances.push(res);
    }

    const res = await Promise.all(balances);

    let currenciesTotal = 0;
    const arr = res.map((item, i) => {
      const token = tokens[i];
      currenciesTotal = currenciesTotal + Number(item.formattedBalance);

      return {
        balance: item.formattedBalance,
        currency: token.currency,
        image: token.image,
        coingeckoId: token.coingeckoId
      };
    });

    return {
      currencies: arr,
      currenciesTotal
    };
  }

  return useQuery({
    queryKey: ["currenciesBalance"],
    queryFn: getCurrenciesBalance,
    staleTime: 30 * 1000
  });
}
