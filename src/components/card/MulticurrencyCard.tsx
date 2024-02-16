import { Image } from "expo-image";
import { useAtomValue } from "jotai";
import { View, StyleSheet, Dimensions } from "react-native";

import Paragraph from "../typography/Paragraph";

import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { borderRadius, base, spacing, dark } from "@/constants/DesignTokens";
import {
  CURRENCY_FORMAT,
  SIMPLE_CURRENCY_FORMAT
} from "@/constants/configurations";
import { hideValuesAtom } from "@/lib/atoms";

type MulticurrencyCardProps = {
  currency: string;
  image: string;
  amount: string;
  price: number;
};

const WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = WIDTH * 0.59;

export default function MulticurrencyCard({
  currency,
  image,
  amount,
  price
}: MulticurrencyCardProps) {
  const isHidden = useAtomValue(hideValuesAtom);

  return (
    <View style={styles.container}>
      <View style={styles.flexWrapper}>
        <View style={styles.currencyWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={image} contentFit="cover" />
          </View>

          <Label size="sm-bold" style={styles.labelSm}>
            {currency}
          </Label>
        </View>

        {/* <Label size="sm-regular">Detalhes</Label> */}
      </View>
      <View>
        <Heading size="heading2" style={styles.heading2}>
          {isHidden
            ? "•••••"
            : Number(amount).toLocaleString("pt-BR", SIMPLE_CURRENCY_FORMAT)}
        </Heading>

        <Paragraph size="sm" style={styles.paragraph}>
          {isHidden
            ? "•••••"
            : (Number(amount) * price).toLocaleString("pt-BR", CURRENCY_FORMAT)}
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: base.grey[90],
    width: CARD_WIDTH,
    aspectRatio: 213 / 109,
    borderRadius: borderRadius.medium,
    padding: 16,
    justifyContent: "space-between"
  },
  flexWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currencyWrapper: {
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
    aspectRatio: 1
  },
  labelSm: {
    textTransform: "uppercase",
    marginTop: 3
  },
  heading2: {
    textAlign: "right"
  },
  paragraph: {
    color: dark.fg.disabled,
    textAlign: "right"
  }
});
