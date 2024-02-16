import SavingIcon from "@assets/icons/saving.svg";
import { View, StyleSheet, Pressable } from "react-native";

import Badge from "@/components/badge/Badge";
import Divider from "@/components/divider/Divider";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { dark, borderRadius, spacing, base } from "@/constants/DesignTokens";

type FixedIncomeCardProps = {
  symbol: string;
  name: string;
  profitability: string;
  risk: string;
  rescue: string;
  onSelectAsset: () => void | undefined;
};

export default function FixedIncomeCard({
  symbol,
  name,
  profitability,
  risk,
  rescue,
  onSelectAsset
}: FixedIncomeCardProps) {
  return (
    <Pressable style={styles.container} onPress={onSelectAsset}>
      <View style={{ paddingHorizontal: spacing[16], gap: spacing[8] }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[4]
          }}
        >
          <SavingIcon />

          <Label size="xs-bold">{symbol}</Label>
        </View>

        <Heading size="heading4">{name}</Heading>
      </View>

      <Divider />

      <View style={styles.infoContainer}>
        <Label size="xs-regular" style={{ color: base.grey[40] }}>
          Rentabilidade
        </Label>

        <Label size="xs-bold" style={{ color: dark.fg.success }}>
          {profitability}
        </Label>
      </View>

      <View style={styles.infoContainer}>
        <Label size="xs-regular" style={{ color: base.grey[40] }}>
          Risco
        </Label>

        <Badge text={risk} style={{ backgroundColor: dark.fg.success }} />
      </View>

      <View style={styles.infoContainer}>
        <Label size="xs-regular" style={{ color: base.grey[40] }}>
          Resgate
        </Label>

        <Label size="xs-bold">{rescue}</Label>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing[16],
    paddingVertical: spacing[16],
    backgroundColor: base.grey[90],
    borderRadius: borderRadius.medium
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing[16],
    alignItems: "center",
    justifyContent: "space-between"
  }
});
