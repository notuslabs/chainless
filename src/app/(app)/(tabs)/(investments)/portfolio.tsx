import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import Chart from "@/components/charts/chart";
import Composition from "@/components/listItems/composition";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { dark, spacing } from "@/constants/DesignTokens";
import useGetBalancesTemp from "@/hooks/useGetBalancesTemp";
import useGetTokens from "@/hooks/useGetTokens";
import { formatCurrency } from "@/utils/numerals";

export default function Investments() {
  const [assetsTotal, setAssetsTotal] = useState(0);
  const [tokens, setTokens] = useState<
    {
      name: string;
      symbol: string;
      amount: number;
      coingeckoId: string;
      percentage: number;
    }[]
  >();

  const {
    data: tokensList,
    refetch: refetchTokens,
    isRefetching: isRefetchingTokens
  } = useGetTokens();
  const {
    data: cryptoBalances,
    refetch: refetchBalances,
    isRefetching: isRefetchingBalances
  } = useGetBalancesTemp();

  function handleRefresh() {
    refetchTokens();
    refetchBalances();
  }

  useEffect(() => {
    if (!cryptoBalances) {
      return;
    }

    if (!tokensList) {
      return;
    }

    if (tokensList?.status?.error_message) {
      return;
    }

    let priceSum = BigNumber(0);
    const tokens = cryptoBalances.currencies.map((item) => {
      const token = tokensList.find(
        (token) => token.symbol.toUpperCase() === item.crypto
      );

      const price = BigNumber(item.balance).multipliedBy(
        token?.current_price ?? 0
      );
      priceSum = priceSum.plus(price);

      return {
        name: token?.name ?? "",
        symbol: token?.symbol ?? "",
        amount: price.toNumber(),
        coingeckoId: token?.id ?? ""
      };
    });

    const arr = tokens
      .map((token) => {
        return {
          ...token,
          percentage: BigNumber(token.amount).div(priceSum).toNumber()
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    setTokens(arr);
    setAssetsTotal(priceSum.toNumber());
  }, [cryptoBalances, tokensList]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingTokens && isRefetchingBalances}
          onRefresh={handleRefresh}
        />
      }
    >
      {tokensList?.status?.error_message ? (
        <Label>{tokensList.status.error_message}</Label>
      ) : (
        <>
          <View style={styles.infoContainer}>
            <Heading size="heading3" style={{ marginBottom: 2 }}>
              Total investido
            </Heading>

            <Heading style={{ marginBottom: 10 }}>
              {formatCurrency(assetsTotal, 6)}
            </Heading>
          </View>

          <Chart
            data={
              assetsTotal <= 0 || !tokens
                ? [{ x: "", y: 100 }]
                : tokens.map((item) => {
                    return {
                      x: item.symbol,
                      y: item.percentage
                    };
                  })
            }
          />

          <Heading style={styles.composition} size="heading5">
            COMPOSIÇÃO
          </Heading>

          {assetsTotal <= 0 ? (
            <View style={{ paddingBottom: 120 }}>
              <Paragraph size="md">
                Você ainda não realizou nenhum investimento
              </Paragraph>
            </View>
          ) : (
            <View style={{ paddingBottom: 120 }}>
              {tokens?.map((item) => {
                return (
                  <Composition
                    key={item.symbol}
                    name={item.name}
                    id={item.coingeckoId}
                    amount={item.amount}
                    percentage={item.percentage}
                  />
                );
              })}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark.bg.canvas,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[24]
  },
  infoContainer: {
    height: 158,
    justifyContent: "center"
  },
  composition: {
    marginTop: 32,
    marginBottom: 16
  }
});
