import { Image } from "expo-image";
import { View, StyleSheet, Pressable } from "react-native";

import Label from "../typography/Label";

import { base, borderRadius, dark, spacing } from "@/constants/DesignTokens";
import { CURRENCY_FORMAT } from "@/constants/configurations";

type TokenDataProps = {
  name: string;
  symbol: string;
  image: string;
  price: number;
  change: number;
  onPress: () => void;
};

export default function TokenData({
  name,
  symbol,
  image,
  price,
  change,
  onPress
}: TokenDataProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={image} />

        <View style={styles.verticalContainer}>
          <Label size="xs-bold">{name}</Label>

          <Label size="xs-bold" style={styles.symbol}>
            {symbol}
          </Label>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Label size="xs-bold">
          {price.toLocaleString("pt-BR", CURRENCY_FORMAT)}
        </Label>

        <View style={{ flexDirection: "row", gap: spacing[4] }}>
          <Label
            style={{ color: change >= 0 ? dark.fg.success : dark.fg.error }}
            size="xs-bold"
          >
            {change > 0 ? "+" : ""}
            {change.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
          </Label>

          <Label size="xs-regular">24h</Label>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: base.grey[90],
    height: 63,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8]
  },
  verticalContainer: {
    gap: spacing[8]
  },
  image: {
    width: spacing[24],
    height: spacing[24]
  },
  rightContainer: {
    alignItems: "flex-end",
    gap: spacing[8]
  },
  symbol: {
    color: base.grey[50],
    textTransform: "uppercase"
  }
});
