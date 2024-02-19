import { StableCurrency } from "@notuslabs/wallet";
import BigNumber from "bignumber.js";
import { StyleSheet } from "react-native";

import Container from "@/components/Container";
import ListButton from "@/components/buttons/ListButton";
import WalletContent from "@/components/listItems/WalletContent";
import Heading from "@/components/typography/Heading";
import { spacing } from "@/constants/DesignTokens";
import useGetCurrenciesBalance from "@/hooks/useGetCurrenciesBalance";
import useGetCurrentPrice from "@/hooks/useGetCurrentPrice";

export type SelectCurrencyEvent = {
  symbol: StableCurrency;
  balance: string;
  balanceFiat: BigNumber;
  image: string;
};

type SelectCurrencyProps = {
  title: string;
  showBalanceZero?: boolean;
  onSelectCurrency: (event: SelectCurrencyEvent) => void;
};

export default function SelectCurrency({
  title,
  showBalanceZero = true,
  onSelectCurrency
}: SelectCurrencyProps) {
  const { data } = useGetCurrenciesBalance();
  const { data: currentPrice } = useGetCurrentPrice(["usd-coin"]);

  return (
    <Container style={styles.container}>
      <Heading size="heading5">{title}</Heading>
      {data?.currencies.map((item) => {
        if (!showBalanceZero && BigNumber(item.balance).lte(0)) {
          return null;
        }

        return (
          <ListButton
            key={item.currency}
            onPress={() =>
              onSelectCurrency({
                symbol: item.currency,
                balance: item.balance,
                balanceFiat: BigNumber(item.balance).multipliedBy(
                  currentPrice?.[item.coingeckoId]?.usd ?? 1
                ),
                image: item.image
              })
            }
          >
            <WalletContent
              iconToken={item.image}
              tokenName={item.currency}
              value={Number(item.balance)}
              price={currentPrice?.[item.coingeckoId]?.usd ?? 1}
            />
          </ListButton>
        );
      })}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: spacing[24]
  }
});
