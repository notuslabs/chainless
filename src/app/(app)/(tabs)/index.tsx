import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";

import Container from "@/components/Container";
import Header from "@/components/Header";
import Wallet from "@/components/Wallet";
import History from "@/components/transaction/History";
import { spacing } from "@/constants/DesignTokens";
import useGetBalancesTemp from "@/hooks/useGetBalancesTemp";
import useGetCurrenciesBalance from "@/hooks/useGetCurrenciesBalance";
import useGetCurrentPrice from "@/hooks/useGetCurrentPrice";
import useGetHistory from "@/hooks/useGetHistory";
import useGetTokens from "@/hooks/useGetTokens";

export default function Index() {
  const [patrimony, setPatrimony] = useState(BigNumber(0));

  const {
    data: fiatBalance,
    refetch: refetchFiatBalance,
    isRefetching: isRefetchingFiatBalance
  } = useGetCurrenciesBalance();
  const {
    data: cryptoBalances,
    refetch: refetchBalances,
    isRefetching: isRefetchingBalances
  } = useGetBalancesTemp();
  const {
    data: tokensList,
    refetch: refetchTokensList,
    isRefetching: isRefetchingTokensList
  } = useGetTokens();
  const {
    data: currentPrice,
    refetch: refetchCurrentPrice,
    isRefetching: isRefetchingPrice
  } = useGetCurrentPrice(["usd-coin"]);
  const { refetch: refetchHistory, isRefetching: isRefetchingHistory } =
    useGetHistory();

  function handleRefresh() {
    refetchFiatBalance();
    refetchBalances();
    refetchCurrentPrice();
    refetchTokensList();
    refetchHistory();
  }

  useEffect(() => {
    if (!cryptoBalances) {
      return;
    }

    if (!tokensList) {
      return;
    }

    if (!fiatBalance) {
      return;
    }

    if (!currentPrice) {
      return;
    }

    if (tokensList?.status?.error_message) {
      return;
    }

    let sum = BigNumber(0);
    for (const token of cryptoBalances.currencies) {
      const price = tokensList.find(
        (item) => item.symbol.toUpperCase() === token.crypto
      );

      sum = sum.plus(BigNumber(token.balance));
    }

    for (const fiat of fiatBalance?.currencies) {
      sum = sum.plus(BigNumber(fiat.balance));
    }

    setPatrimony(sum);
  }, [cryptoBalances, tokensList, fiatBalance, currentPrice]);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={
            isRefetchingFiatBalance &&
            isRefetchingBalances &&
            isRefetchingTokensList &&
            isRefetchingPrice &&
            isRefetchingHistory
          }
          onRefresh={handleRefresh}
        />
      }
    >
      <Header total={patrimony.toString()} change="0" />

      <Container style={styles.container}>
        <Wallet />

        <History />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    paddingBottom: 106,
    gap: spacing[64]
  }
});
