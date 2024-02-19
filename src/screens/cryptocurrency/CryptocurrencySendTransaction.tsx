import { PriceRoute, UserOperationOutput } from "@notuslabs/wallet";
import BigNumber from "bignumber.js";
import { View } from "react-native";

import TransactionSuccess from "../TransactionSuccess";

import Container from "@/components/Container";
import Loading from "@/components/Loading";
import InvestmentCryptocurrencyReceipt from "@/components/receipts/InvestmentCryptocurrencyReceipt";
import Label from "@/components/typography/Label";

type CryptocurrencySendTransactionProps = {
  isSwapping: boolean;
  swapResponse: UserOperationOutput | undefined;
  transactionType: "invest" | "redeem";
  error: string | undefined;
  quote: PriceRoute;
  tokenInSymbol: string;
  tokenOutSymbol: string;
  handleBack(): void;
};

export default function CryptocurrencySendTransaction({
  isSwapping,
  swapResponse,
  transactionType,
  handleBack,
  quote,
  tokenInSymbol,
  tokenOutSymbol,
  error
}: CryptocurrencySendTransactionProps) {
  return (
    <Container>
      {isSwapping ? (
        <Loading />
      ) : (
        <>
          {typeof swapResponse !== "undefined" ? (
            <TransactionSuccess
              title={
                transactionType === "invest"
                  ? "Compra confirmada"
                  : "Venda confirmada"
              }
              buttonLabel="Voltar para investimentos"
              onBack={handleBack}
            >
              <InvestmentCryptocurrencyReceipt
                id={swapResponse.userOpReceipts[0].transactionHash}
                amount={
                  transactionType === "invest"
                    ? BigNumber(quote.destAmount)
                        .div(BigNumber(10).pow(quote.destDecimals))
                        .toNumber()
                    : BigNumber(quote.srcAmount)
                        .div(BigNumber(10).pow(quote.srcDecimals))
                        .toNumber()
                }
                symbol={
                  transactionType === "invest" ? tokenOutSymbol : tokenInSymbol
                }
                transactionType={transactionType}
                isSuccess={swapResponse.userOpReceipts[0].success}
                gas={swapResponse.userOpReceipts[0].gasUsedNative}
              />
            </TransactionSuccess>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Label size="md-bold">{error}</Label>
            </View>
          )}
        </>
      )}
    </Container>
  );
}
