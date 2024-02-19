import { StableCurrency } from "@notuslabs/wallet";

import { useSession } from "@/context/auth";

type GetBalanceType = {
  currency: StableCurrency;
};

export default function useGetAddress() {
  const { client } = useSession();

  async function getAddress({ currency }: GetBalanceType) {
    if (!client) {
      return "";
    }

    const res = await client.payments.getDepositAddress({ currency });

    return res.depositAddress;
  }

  return getAddress;
}
