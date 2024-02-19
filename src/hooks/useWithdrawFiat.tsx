import {
  StableCurrency,
  TransferFailedException,
  UserOperationOutput
} from "@notuslabs/wallet";
import { useState } from "react";

import { useSession } from "@/context/auth";

type GetBalanceOptions = {
  currency: StableCurrency;
  amount: string;
  to: `0x${string}`;
};

export default function useWithdrawFiat() {
  const [response, setResponse] = useState<UserOperationOutput>();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { client } = useSession();

  async function sendTransaction({ amount, currency, to }: GetBalanceOptions) {
    if (!client) {
      return;
    }

    setIsSending(true);

    try {
      const res = await client.payments.transfer({ amount, currency, to });

      setResponse(res);
    } catch (error) {
      if (error instanceof TransferFailedException) {
        setError(error.message);
      }

      setError("Your transaction could not be executed");
    }

    setIsSending(false);
  }

  return {
    sendTransaction,
    response,
    isSending,
    error
  };
}
