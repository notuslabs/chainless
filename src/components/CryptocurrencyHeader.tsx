import BigNumber from "bignumber.js";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import AssetAccordion from "./accordion/AssetAccordion";
import ToggleGroup from "./inputs/ToggleGroup";

import LineChart from "@/components/charts/LineChart";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { borderRadius, dark, spacing } from "@/constants/DesignTokens";
import { CURRENCY_FORMAT } from "@/constants/configurations";
import useGetBalancesTemp from "@/hooks/useGetBalancesTemp";
import useGetPriceChart, { PriceChart } from "@/hooks/useGetPriceChart";

type CryptocurrencyHeaderProps = {
  name: string;
  symbol: string;
  image: string;
  price: number;
  change: number;
  coingeckoId: string;
};

const DEFAULT_VALUE = 7;

const period = [
  { label: "1D", value: "1" },
  { label: "7D", value: "7" },
  { label: "1M", value: "30" },
  { label: "3M", value: "91" },
  { label: "1A", value: "365" }
];

export default function CryptocurrencyHeader({
  name,
  symbol,
  image,
  price,
  change,
  coingeckoId
}: CryptocurrencyHeaderProps) {
  const [days, setDays] = useState(DEFAULT_VALUE);
  const [chartData, setChartData] = useState<PriceChart | undefined>(undefined);
  const { data, fetchStatus } = useGetPriceChart({
    id: coingeckoId,
    days
  });

  const { data: balance } = useGetBalancesTemp();

  const cryptoBalance = balance?.currencies.find(
    (item) => item.crypto === String(symbol ?? "").toUpperCase()
  );

  useEffect(() => {
    setChartData(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={image} contentFit="cover" />
        </View>

        <Heading size="heading5">{name}</Heading>
      </View>

      <View style={{ gap: 34 }}>
        <View style={{ gap: spacing[12] }}>
          <View style={{ gap: spacing[4] }}>
            <Heading size="heading5">Preço de {symbol.toUpperCase()}</Heading>

            <Heading size="heading2">
              {price.toLocaleString("en-US", CURRENCY_FORMAT)}
            </Heading>
          </View>

          <View style={styles.changeContainer}>
            <Label
              size="md-bold"
              style={{ color: change >= 0 ? dark.fg.success : dark.fg.error }}
            >
              {change > 0 ? "+" : ""}
              {change.toLocaleString("en-US", { maximumFractionDigits: 2 })}%
            </Label>

            <Label size="xs-regular">24h</Label>
          </View>
        </View>

        <View style={{ gap: spacing[16] }}>
          <LineChart data={chartData} />

          <ToggleGroup
            togglers={period}
            defaultValue={DEFAULT_VALUE.toString()}
            onPress={(event) => {
              if (fetchStatus === "idle") {
                setChartData(undefined);
              }

              setDays(Number(event.value));
            }}
          />
        </View>

        {cryptoBalance && BigNumber(cryptoBalance?.balance ?? 0).gt(0) ? (
          <AssetAccordion
            value={BigNumber(cryptoBalance.balance)
              .multipliedBy(price)
              .toNumber()}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[24],
    marginHorizontal: 16,
    marginTop: spacing[24],
    paddingBottom: spacing[16]
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12]
  },
  imageWrapper: {
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  image: {
    width: 24,
    aspectRatio: 1
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  }
});
