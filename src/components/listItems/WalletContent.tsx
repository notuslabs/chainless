import WalletIcon from "@assets/icons/wallet.svg";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

import Paragraph from "../typography/Paragraph";

import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { borderRadius, dark, spacing } from "@/constants/DesignTokens";
import {
  CURRENCY_FORMAT,
  SIMPLE_CURRENCY_FORMAT
} from "@/constants/configurations";

type WalletContentProps = {
  iconToken: string;
  tokenName: string;
  value: number;
  price: number;
};

export default function WalletContent({
  iconToken,
  tokenName,
  value,
  price
}: WalletContentProps) {
  return (
    <View style={{ gap: spacing[16] }}>
      <View style={styles.token}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={iconToken}
            contentFit="cover"
            accessibilityLabel="Currency logo"
          />
        </View>

        <Label
          style={{ textTransform: "uppercase", marginTop: 4 }}
          size="md-bold"
        >
          {tokenName}
        </Label>
      </View>

      <View>
        <View style={styles.value}>
          <WalletIcon />

          <Heading size="heading3">
            {value.toLocaleString("pt-BR", SIMPLE_CURRENCY_FORMAT)}
          </Heading>
        </View>

        <Paragraph size="xs" style={styles.paragraph}>
          {(value * price).toLocaleString("pt-BR", CURRENCY_FORMAT)}
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  token: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4]
  },
  imageWrapper: {
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  image: {
    width: 20,
    height: 20
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8]
  },
  paragraph: { color: dark.fg.muted, marginLeft: 32 }
});
