import {
  PriceRoute,
  QuoteInput,
  UserOperationOutput,
  SwapFailedException
} from "@notuslabs/wallet";
import { useState } from "react";

import { useSession } from "@/context/auth";

export default function useInvestCrypto() {
  const [quote, setQuote] = useState<PriceRoute>();
  const [isFetching, setIsFetching] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResponse, setSwapResponse] = useState<UserOperationOutput>();
  const [error, setError] = useState<string>();

  const { client } = useSession();

  async function getQuote({ tokenIn, tokenOut, amountTokenIn }: QuoteInput) {
    if (!client) {
      return;
    }

    setIsFetching(true);

    try {
      const res = await client.crypto.getQuote({
        tokenIn,
        tokenOut,
        amountTokenIn
      });

      setQuote(res);
      setError(undefined);
    } catch (error) {
      if (error instanceof SwapFailedException) {
        setError(error?.extra?.error ?? "");
      } else {
        setError("Unable to get price");
      }

      setQuote(undefined);
    }

    setIsFetching(false);
  }

  async function swap(priceRoute: PriceRoute) {
    if (!client) {
      return;
    }

    setIsSwapping(true);

    try {
      const res = await client.crypto.swap({ priceRoute });

      setSwapResponse(res);
      setError(undefined);
    } catch (error) {
      if (error instanceof SwapFailedException) {
        setError(error.message ?? "");
      } else {
        setError("Unable to swap");
      }

      setSwapResponse(undefined);
    }

    setIsSwapping(false);
  }

  return {
    getQuote,
    quote,
    isFetching,
    swap,
    swapResponse,
    isSwapping,
    error
  };
}
