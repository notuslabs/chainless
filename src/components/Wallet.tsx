import ArrowCircleUpRightIcon from "@assets/icons/arrow-circle-up-right.svg";
import CirclePlusIcon from "@assets/icons/cirlce-plus.svg";
import ExchangeIcon from "@assets/icons/exchange.svg";
import NavigationPointerIcon from "@assets/icons/navigation-pointer-01.svg";
import SavingIcon from "@assets/icons/saving.svg";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MenuButton from "@/components/buttons/MenuButton";
import MulticurrencyCard from "@/components/card/MulticurrencyCard";
import Heading from "@/components/typography/Heading";
import { base, borderRadius, spacing } from "@/constants/DesignTokens";
import useGetCurrenciesBalance from "@/hooks/useGetCurrenciesBalance";
import useGetCurrentPrice from "@/hooks/useGetCurrentPrice";

const WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = WIDTH * 0.5916;
const CARD_HEIGHT = CARD_WIDTH * (109 / 213);

const buttons = [
  {
    name: "Deposit",
    icon: <CirclePlusIcon />,
    route: "/deposit"
  },
  {
    name: "Withdraw",
    icon: <ArrowCircleUpRightIcon />,
    route: "/withdraw"
  },
  {
    name: "Invest",
    icon: <SavingIcon width={32} height={32} />,
    route: "/products"
  },
  {
    name: "Convert",
    icon: <ExchangeIcon />,
    route: "/convert"
  },
  {
    name: "Transfer",
    icon: <NavigationPointerIcon />,
    route: "/transfer"
  }
] as const;

const placeHolder = [
  { currency: "", image: "", balance: "", coingeckoId: "1" },
  { currency: "", image: "", balance: "", coingeckoId: "2" }
];

export default function Wallet() {
  const { data, isLoading } = useGetCurrenciesBalance();
  const { data: currentPrice, isLoading: isLoadingPrice } = useGetCurrentPrice([
    "usd-coin"
  ]);

  return (
    <View style={styles.container}>
      <Heading size="heading5" style={styles.heading5}>
        BALANCE TO INVEST
      </Heading>

      <ScrollView
        contentContainerStyle={styles.multicurrencyCardContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {(data?.currencies ?? placeHolder).map((item) => (
          <Skeleton
            key={item.coingeckoId}
            colors={[base.grey[90], base.grey[70], base.grey[90]]}
            height={CARD_HEIGHT}
            width={CARD_WIDTH}
            radius={borderRadius.medium}
          >
            {isLoading || isLoadingPrice ? null : (
              <MulticurrencyCard
                currency={item.currency}
                image={item.image}
                amount={item.balance}
                price={1}
              />
            )}
          </Skeleton>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.buttonGroup}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {buttons.map((button) => (
          <MenuButton
            key={button.name}
            text={button.name}
            icon={button.icon}
            onPress={() => router.push(button.route as `http:${string}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[24],
    gap: spacing[16]
  },
  heading5: {
    paddingHorizontal: spacing[16]
  },
  multicurrencyCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[16],
    paddingHorizontal: spacing[16],
    height: CARD_HEIGHT
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[16],
    paddingHorizontal: spacing[16]
  }
});
