import ArrowCircleUpRight from "@assets/icons/arrow-circle-up-right.svg";
import CirclePlusSmallIcon from "@assets/icons/circle-plus-small.svg";
import BigNumber from "bignumber.js";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

import Details from "./tabs/Details";
import Informations from "./tabs/Informations";

import Container from "@/components/Container";
import CryptocurrencyHeader from "@/components/CryptocurrencyHeader";
import Button from "@/components/buttons/Button";
import CustomTabBar from "@/components/navigation/CustomTabBar";
import Label from "@/components/typography/Label";
import { accent, dark, spacing } from "@/constants/DesignTokens";
import useGetBalancesTemp from "@/hooks/useGetBalancesTemp";
import useGetTokenInfo from "@/hooks/useGetTokenInfo";

type CryptocurrencyInfoProps = {
  cryptocurrency: string;
  onInvest: (event: {
    name: string;
    image: string;
    change: number;
    symbol: string;
    balance: string;
    balanceFiat: BigNumber;
  }) => void;
  onRedeem: (event: {
    name: string;
    image: string;
    change: number;
    symbol: string;
    balance: string;
    balanceFiat: BigNumber;
  }) => void;
};

export default function CryptocurrencyInfo({
  cryptocurrency,
  onInvest,
  onRedeem
}: CryptocurrencyInfoProps) {
  const { data, isLoading } = useGetTokenInfo(cryptocurrency);

  const { data: balance } = useGetBalancesTemp();

  const cryptoBalance = balance?.currencies.find(
    (item) => item.crypto === String(data?.symbol ?? "").toUpperCase()
  );

  if (cryptocurrency.length < 1) {
    return null;
  }

  return (
    <Container style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1 }}
          color={accent.moderate}
        />
      ) : (
        <>
          {data?.name ? (
            <>
              <Tabs.Container
                renderHeader={() => (
                  <CryptocurrencyHeader
                    name={data.name}
                    symbol={data.symbol}
                    image={data.image.small}
                    price={data.market_data.current_price.usd}
                    change={data.market_data.price_change_percentage_24h}
                    coingeckoId={cryptocurrency}
                  />
                )}
                pagerProps={{ scrollEnabled: false }}
                headerContainerStyle={{
                  backgroundColor: dark.bg.canvas
                }}
                tabBarHeight={48}
                renderTabBar={(props) => <CustomTabBar {...props} />}
              >
                <Tabs.Tab name="Informações">
                  <Tabs.ScrollView
                    style={styles.scrollContainer}
                    fadingEdgeLength={100}
                    showsVerticalScrollIndicator={false}
                  >
                    <Informations
                      summary={data.description.en}
                      site={data.links.homepage[0]}
                    />
                  </Tabs.ScrollView>
                </Tabs.Tab>

                <Tabs.Tab name="Detalhes">
                  <Tabs.ScrollView
                    style={styles.scrollContainer}
                    fadingEdgeLength={100}
                    showsVerticalScrollIndicator={false}
                  >
                    <Details
                      rank={data.market_cap_rank}
                      marketcap={data.market_data.market_cap.usd}
                      volume={data.market_data.total_volume.usd}
                      circulatingSupply={data.market_data.circulating_supply}
                      ath={data.market_data.ath.usd}
                      link={`https://www.coingecko.com/en/coins/${cryptocurrency}`}
                    />
                  </Tabs.ScrollView>
                </Tabs.Tab>
              </Tabs.Container>

              <View style={styles.buttonWrapper}>
                {cryptoBalance &&
                BigNumber(cryptoBalance?.balance ?? 0).gt(0) ? (
                  <View style={{ flex: 1 }}>
                    <Button
                      text="Vender"
                      leadingIcon={
                        <ArrowCircleUpRight
                          stroke="white"
                          width={24}
                          height={24}
                        />
                      }
                      backgroundColor={dark.bg.canvas}
                      color={dark.fg.base}
                      onPress={() =>
                        onRedeem({
                          name: data.name,
                          image: data.image.small,
                          change: data.market_data.price_change_percentage_24h,
                          symbol: String(data.symbol).toUpperCase(),
                          balance: cryptoBalance.balance,
                          balanceFiat: BigNumber(
                            cryptoBalance.balance
                          ).multipliedBy(data.market_data.current_price.usd)
                        })
                      }
                    />
                  </View>
                ) : null}

                <View style={{ flex: 1 }}>
                  <Button
                    text="Comprar"
                    leadingIcon={
                      <CirclePlusSmallIcon stroke={dark.fg["on-contrast"]} />
                    }
                    onPress={() =>
                      onInvest({
                        name: data.name,
                        image: data.image.small,
                        change: data.market_data.price_change_percentage_24h,
                        symbol: String(data.symbol).toUpperCase(),
                        balance: cryptoBalance?.balance ?? "0",
                        balanceFiat: BigNumber(
                          cryptoBalance?.balance ?? "0"
                        ).multipliedBy(data.market_data.current_price.usd)
                      })
                    }
                  />
                </View>
              </View>
            </>
          ) : (
            <Label style={{ padding: 16 }}>{data.status.error_message}</Label>
          )}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  space: {
    height: spacing[16]
  },
  scrollContainer: {
    paddingHorizontal: spacing[16]
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: spacing[8],
    padding: spacing[16]
  }
});
