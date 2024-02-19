import { CryptoAssets, PriceRoute } from "@notuslabs/wallet";
import BigNumber from "bignumber.js";
import {
  Stack,
  router,
  useNavigation,
  useLocalSearchParams
} from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, { BounceIn } from "react-native-reanimated";

import Container from "@/components/Container";
import Loading from "@/components/Loading";
import BackNavigation from "@/components/navigation/BackNavigation";
import Label from "@/components/typography/Label";
import { spacing } from "@/constants/DesignTokens";
import useInvestCrypto from "@/hooks/useInvestCrypto";
import AmountInput from "@/screens/AmountInput";
import SelectCurrency from "@/screens/SelectCurrency";
import ConfirmInvestment from "@/screens/cryptocurrency/ConfirmInvestment";
import CryptocurrencyInfo from "@/screens/cryptocurrency/CryptocurrencyInfo";
import CryptocurrencySendTransaction from "@/screens/cryptocurrency/CryptocurrencySendTransaction";

const INITIAL_VALUE: {
  image: string;
  change?: number;
  symbol: string;
  balance: string;
  balanceFiat: BigNumber;
} = {
  image: "",
  symbol: "",
  balance: "0",
  balanceFiat: new BigNumber(0)
};

export default function Cryptocurrency() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [tokenOut, setTokenOut] = useState(INITIAL_VALUE);
  const [tokenIn, setTokenIn] = useState(INITIAL_VALUE);
  const [transactionType, setTransactionType] = useState<"invest" | "redeem">(
    "invest"
  );
  const { id } = useLocalSearchParams<{ id: string }>();

  const navigation = useNavigation();

  const { getQuote, isFetching, quote, error, swap, isSwapping, swapResponse } =
    useInvestCrypto();

  const pagerRef = useRef<PagerView>(null);

  const nextPage = () => {
    pagerRef.current?.setPage(currentScreen + 1);
  };

  const previousPage = () => {
    if (currentScreen > 0) {
      pagerRef.current?.setPage(currentScreen - 1);

      if (currentScreen === 1) {
        navigation.setOptions({
          title: "Criptomoedas"
        });
      }
      return;
    }

    router.back();
  };

  function handleNext(value: string) {
    getQuote({
      amountTokenIn: value as `${number}`,
      tokenIn: tokenIn.symbol as CryptoAssets,
      tokenOut: tokenOut.symbol as CryptoAssets
    });

    nextPage();
  }

  function handleConfirm(quote: PriceRoute) {
    swap(quote);

    nextPage();
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Criptomoedas"
    });
  }, [navigation]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackNavigation onPress={previousPage} />
        }}
      />

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={false}
        onPageSelected={(e) => setCurrentScreen(e.nativeEvent.position)}
      >
        <CryptocurrencyInfo
          key="1"
          cryptocurrency={id}
          onInvest={(event) => {
            setTokenOut(event);
            setTransactionType("invest");
            navigation.setOptions({ title: `Investimento ${event.name}` });

            nextPage();
          }}
          onRedeem={(event) => {
            setTokenIn(event);
            setTransactionType("redeem");
            navigation.setOptions({ title: `Retirada ${event.name}` });

            nextPage();
          }}
        />

        <SelectCurrency
          key="2"
          title={
            transactionType === "invest"
              ? "SELECIONE A MOEDA NA QUAL O DEPÓSITO SERÁ REALIZADO"
              : "SELECIONE A MOEDA NA QUAL VOCÊ QUER QUE O RESGATE SEJA REALIZADO"
          }
          showBalanceZero={transactionType !== "invest"}
          onSelectCurrency={({ balance, balanceFiat, image, symbol }) => {
            if (transactionType === "invest") {
              setTokenIn({
                symbol,
                image,
                balance,
                balanceFiat
              });
            } else {
              setTokenOut({
                symbol,
                image,
                balance,
                balanceFiat
              });
            }

            nextPage();
          }}
        />

        <AmountInput
          key="3"
          title={
            transactionType === "invest"
              ? "CONFIGURAÇÃO DO DEPÓSITO"
              : "CONFIGURAÇÃO DO RESGATE"
          }
          subTitle={
            transactionType === "invest"
              ? "Quanto você deseja investir?"
              : "Qual o valor do resgate?"
          }
          symbol={tokenIn.symbol}
          image={tokenIn.image}
          balance={tokenIn.balance}
          balanceFiat={tokenIn.balanceFiat.toString()}
          disabledText="Insira um valor para investir"
          onNext={handleNext}
        />

        <Container key="4">
          {isFetching ? (
            <Loading />
          ) : (
            <>
              {quote ? (
                <ConfirmInvestment
                  tokenIn={{
                    symbol: tokenIn.symbol,
                    image: tokenIn.image,
                    change: tokenIn.change
                  }}
                  tokenOut={{
                    symbol: tokenOut.symbol,
                    image: tokenOut.image,
                    change: tokenOut.change
                  }}
                  transactionType={transactionType}
                  quote={quote}
                  handleConfirm={() => handleConfirm(quote)}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing[8]
                  }}
                >
                  <Animated.View entering={BounceIn}>
                    <Label>{error}</Label>
                  </Animated.View>
                </View>
              )}
            </>
          )}
        </Container>

        <View key="5">
          {quote ? (
            <CryptocurrencySendTransaction
              swapResponse={swapResponse}
              isSwapping={isSwapping}
              quote={quote}
              tokenInSymbol={tokenIn.symbol}
              tokenOutSymbol={tokenOut.symbol}
              transactionType={transactionType}
              handleBack={router.back}
              error={error}
            />
          ) : null}
        </View>
      </PagerView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: spacing[16]
  },
  pagerView: {
    flex: 1
  }
});
