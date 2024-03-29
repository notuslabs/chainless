import ExternalLinkIcon from "@assets/icons/external-link.svg";
import BigNumber from "bignumber.js";
import { View, StyleSheet, Pressable, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Divider from "@/components/divider/Divider";
import Label from "@/components/typography/Label";
import { borderRadius, dark, base, spacing } from "@/constants/DesignTokens";
import { BLOCK_SCAN, SIMPLE_CURRENCY_FORMAT } from "@/constants/configurations";
import useGetTokens from "@/hooks/useGetTokens";
import { formatCurrency } from "@/utils/numerals";

type InvestmentCryptocurrencyReceiptProps = {
  id: string;
  amount: number;
  symbol: string;
  isSuccess: boolean;
  gas: string;
  transactionType: "invest" | "redeem";
};

const currentDate = new Date();

export default function InvestmentCryptocurrencyReceipt({
  id,
  amount,
  symbol,
  isSuccess,
  gas,
  transactionType
}: InvestmentCryptocurrencyReceiptProps) {
  const { data } = useGetTokens();
  const wmatic = data?.find((item) => item.id === "wmatic");
  const token = data?.find((item) => item.symbol === symbol.toLowerCase());

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.item}>
        <Label size="xs-regular" style={styles.title}>
          {currentDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false
          })}
        </Label>

        <Label size="xs-regular" style={styles.title}>
          Transaction ID
        </Label>

        <Pressable
          style={styles.linkContainer}
          onPress={() => Linking.openURL(`${BLOCK_SCAN}${id}`)}
        >
          <Label size="sm-bold" style={styles.value}>
            {id}
          </Label>

          <ExternalLinkIcon stroke={base.grey[100]} />
        </Pressable>
      </View>

      <Divider />

      <View style={styles.item}>
        <Label size="xs-regular" style={styles.title}>
          Status
        </Label>

        <Label
          style={[
            styles.value,
            { color: isSuccess ? dark.fg.success : dark.fg.error }
          ]}
        >
          {isSuccess ? "Success" : "Failed"}
        </Label>
      </View>
      <View style={styles.item}>
        <Label size="xs-regular" style={styles.title}>
          {transactionType === "invest" ? "Amount invested" : "Value redeemed"}
        </Label>

        <Label style={styles.value}>
          {amount.toLocaleString("en-US", {
            ...SIMPLE_CURRENCY_FORMAT,
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
          })}{" "}
          {symbol}
        </Label>

        <Label size="sm-regular" style={styles.title}>
          {formatCurrency(
            BigNumber(amount)
              .multipliedBy(token?.current_price ?? 0)
              .toNumber(),
            3
          )}
        </Label>
      </View>

      <View style={styles.item}>
        <Label size="xs-regular" style={styles.title}>
          Transaction Fee
        </Label>

        <Label style={styles.value}>
          {formatCurrency(
            BigNumber(gas)
              .multipliedBy(wmatic?.current_price ?? 0)
              .toNumber(),
            3
          )}
        </Label>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    backgroundColor: dark.bg.contrast,
    borderRadius: borderRadius.large,
    padding: 24,
    gap: spacing[24]
  },
  item: {
    gap: spacing[8]
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[8]
  },
  title: {
    color: base.grey[60]
  },
  value: {
    color: dark.fg["on-contrast"],
    flexShrink: 1
  }
});
