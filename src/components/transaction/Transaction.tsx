import ArrowIcon from "@assets/icons/arrow-circle-up-right.svg";
import CirclePlusIcon from "@assets/icons/circle-plus-small.svg";
import { View, StyleSheet } from "react-native";

import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { base, spacing } from "@/constants/DesignTokens";
import { SIMPLE_CURRENCY_FORMAT } from "@/constants/configurations";

type TransactionProps = {
  asset: string;
  timestamp: string;
  amount: string;
  type: string;
};

export default function Transaction({
  asset,
  timestamp,
  amount,
  type
}: TransactionProps) {
  return (
    <View>
      <View style={styles.content}>
        {type === "deposit" ? (
          <CirclePlusIcon stroke={base.white} />
        ) : (
          <ArrowIcon width={24} height={24} />
        )}

        <Paragraph size="xs" style={styles.paragraphXS}>
          {timestamp}
        </Paragraph>

        <Label size="sm-bold" style={styles.labelSMbold}>
          {Number(amount).toLocaleString("pt-BR", {
            ...SIMPLE_CURRENCY_FORMAT,
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
          })}{" "}
          {asset}
        </Label>
      </View>

      <Label size="sm-bold" style={styles.transactionType}>
        {type === "deposit" ? "Depósito" : "Retirada"} {asset}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8]
  },
  paragraphXS: {
    color: base.grey[40]
  },
  labelSMbold: {
    marginTop: 4,
    marginLeft: "auto"
  },

  transactionType: {
    marginLeft: spacing[32]
  }
});
