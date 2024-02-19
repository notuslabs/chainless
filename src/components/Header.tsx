import { useAtomValue } from "jotai";
import { Skeleton } from "moti/skeleton";
import { View, StyleSheet } from "react-native";

import Heading from "@/components/typography/Heading";
import { dark, spacing, base, borderRadius } from "@/constants/DesignTokens";
import { hideValuesAtom } from "@/lib/atoms";
import { formatCurrency } from "@/utils/numerals";

type HeaderProps = {
  total: string;
  change: string;
};

export default function Header({ total, change }: HeaderProps) {
  const isHidden = useAtomValue(hideValuesAtom);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Heading size="heading5" style={{ color: dark.fg["on-contrast"] }}>
          Meu patrimônio
        </Heading>

        <Skeleton
          colors={[base.grey[90], base.grey[70], base.grey[90]]}
          height={38}
          width={103}
          radius={borderRadius.small}
        >
          <Heading style={{ color: dark.fg["on-contrast"] }}>
            {isHidden ? "•••••" : formatCurrency(Number(total), 3)}
          </Heading>
        </Skeleton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    gap: spacing[12]
  },
  textContainer: {
    gap: spacing[4]
  },
  textFlex: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4]
  },
  textGreen: {
    color: base.green[60]
  },
  textRed: {
    color: base.red[60]
  }
});
