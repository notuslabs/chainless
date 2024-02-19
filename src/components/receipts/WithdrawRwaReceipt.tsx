import ExternalLinkIcon from "@assets/icons/external-link.svg";
import { View, StyleSheet, Pressable, Linking } from "react-native";

import Divider from "@/components/divider/Divider";
import Label from "@/components/typography/Label";
import { borderRadius, dark, base, spacing } from "@/constants/DesignTokens";
import {
  BLOCK_SCAN,
  CURRENCY_FORMAT,
  SIMPLE_CURRENCY_FORMAT
} from "@/constants/configurations";

type WithdrawRwaReceiptProps = {
  id: string;
  amount: number;
  symbol: string;
};

const currentDate = new Date();

export default function WithdrawRwaReceipt({
  id,
  amount,
  symbol
}: WithdrawRwaReceiptProps) {
  return (
    <View style={styles.container}>
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
          ID da transação
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
          Aplicação
        </Label>

        <Label style={styles.value}>Backed IB01 $ Treasury Bond 0-1yr</Label>
      </View>

      <View style={styles.item}>
        <Label size="xs-regular" style={styles.title}>
          Resgate realizado
        </Label>

        <Label style={styles.value}>
          {amount.toLocaleString("en-US", SIMPLE_CURRENCY_FORMAT)} {symbol}
        </Label>

        <Label size="sm-regular" style={styles.title}>
          {amount.toLocaleString("en-US", CURRENCY_FORMAT)}
        </Label>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
